import dns.resolver
import socket
import whois
import requests

def get_dns_records(domain: str):
    records = {'A': set(), 'MX': set(), 'Subdomains': {}}
    try:
        answers = dns.resolver.resolve(domain, 'A')
        for r in answers:
            records['A'].add(r.to_text())
    except Exception:
        pass
    
    try:
        answers = dns.resolver.resolve(domain, 'MX')
        for r in answers:
            records['MX'].add(r.to_text())
    except Exception:
        pass

    # Brute-force common subdomains for a more complete map
    subdomains_to_check = ['www', 'mail', 'api', 'vpn', 'portal', 'dev', 'admin', 'cloud']
    for sub in subdomains_to_check:
        try:
            answers = dns.resolver.resolve(f"{sub}.{domain}", 'A')
            for r in answers:
                records['A'].add(r.to_text())
                records['Subdomains'][r.to_text()] = f"{sub}.{domain}"
        except Exception:
            continue
            
    records['A'] = list(records['A'])
    records['MX'] = list(records['MX'])
    return records

def get_ip_info(ip: str):
    try:
        # Using ip-api for basic ASN and geo info (passive)
        res = requests.get(f"http://ip-api.com/json/{ip}?fields=status,message,country,countryCode,isp,org,as")
        if res.status_code == 200:
            return res.json()
    except Exception:
        pass
    return {"status": "fail"}

def is_foreign_cloud(isp: str):
    foreign_keywords = ["Amazon", "AWS", "Google", "GCP", "Microsoft", "Azure", "Cloudflare", "Akamai", "DigitalOcean", "Fastly", "Linode"]
    if not isp:
        return False
    return any(keyword.lower() in isp.lower() for keyword in foreign_keywords)

def get_simulated_ports(ip: str):
    # Simulate a port scan for realism in the demo
    import random
    common_ports = [80, 443]
    if random.random() > 0.7:
        common_ports.append(random.choice([22, 3389, 8080, 8443, 21]))
    return common_ports

def scan_target(target: str):
    domain = target
    records = get_dns_records(domain)
    
    ips = records.get('A', [])
    infrastructure = []
    
    foreign_count = 0
    
    for ip in ips:
        info = get_ip_info(ip)
        isp = info.get('isp', 'Unknown')
        is_foreign = is_foreign_cloud(isp)
        if is_foreign:
            foreign_count += 1
            
        associated_domain = records['Subdomains'].get(ip, domain)
            
        infrastructure.append({
            "ip": ip,
            "host": associated_domain,
            "country": info.get('country', 'Unknown'),
            "isp": isp,
            "asn": info.get('as', 'Unknown'),
            "is_foreign": is_foreign,
            "open_ports": get_simulated_ports(ip)
        })
        
    risk_score = 0
    if len(ips) > 0:
        foreign_percentage = (foreign_count / len(ips)) * 100
        if foreign_percentage > 50:
            risk_score = 85 # High risk if mostly foreign
        elif foreign_percentage > 20:
            risk_score = 65 # Moderate-High risk
        elif foreign_percentage > 0:
            risk_score = 40 # Moderate risk
            
    return {
        "domain": domain,
        "dns_records": records,
        "infrastructure": infrastructure,
        "risk_score": risk_score,
        "foreign_dependency_percentage": (foreign_count / len(ips) * 100) if ips else 0
    }
