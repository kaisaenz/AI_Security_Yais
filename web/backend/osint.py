import dns.resolver
import socket
import whois
import requests

def get_dns_records(domain: str):
    records = {}
    try:
        answers = dns.resolver.resolve(domain, 'A')
        records['A'] = [r.to_text() for r in answers]
    except Exception:
        records['A'] = []
    
    try:
        answers = dns.resolver.resolve(domain, 'MX')
        records['MX'] = [r.to_text() for r in answers]
    except Exception:
        records['MX'] = []
        
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
    foreign_keywords = ["Amazon", "AWS", "Google", "GCP", "Microsoft", "Azure", "Cloudflare", "Akamai", "DigitalOcean"]
    if not isp:
        return False
    return any(keyword.lower() in isp.lower() for keyword in foreign_keywords)

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
            
        infrastructure.append({
            "ip": ip,
            "country": info.get('country', 'Unknown'),
            "isp": isp,
            "asn": info.get('as', 'Unknown'),
            "is_foreign": is_foreign
        })
        
    risk_score = 0
    if len(ips) > 0:
        foreign_percentage = (foreign_count / len(ips)) * 100
        if foreign_percentage > 50:
            risk_score = 80 # High risk if mostly foreign
        elif foreign_percentage > 0:
            risk_score = 40 # Moderate risk
            
    return {
        "domain": domain,
        "dns_records": records,
        "infrastructure": infrastructure,
        "risk_score": risk_score,
        "foreign_dependency_percentage": (foreign_count / len(ips) * 100) if ips else 0
    }
