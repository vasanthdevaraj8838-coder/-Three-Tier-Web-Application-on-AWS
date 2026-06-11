# Three-Tier Web Application on AWS

## Project Overview
This project demonstrates a highly available Three-Tier Web Application deployed on AWS.

The architecture is divided into three layers:

1. Presentation Layer (Web Tier)
2. Application Layer (App Tier)
3. Database Layer (DB Tier)

This design improves security, scalability, availability, and maintainability.

---

# Architecture Diagram

Internet
│
▼
Application Load Balancer (ALB)
│
▼
Web Tier (EC2 Instances)
│
▼
App Tier (EC2 Instances)
│
▼
Amazon RDS (MySQL)

---

# AWS Services Used

| Service | Purpose |
|----------|----------|
| VPC | Network Isolation |
| Public Subnets | Web Tier Deployment |
| Private Subnets | App and Database Tiers |
| Internet Gateway | Internet Access |
| NAT Gateway | Outbound Internet for Private Subnets |
| EC2 | Web and Application Servers |
| Application Load Balancer | Traffic Distribution |
| Auto Scaling Group | Automatic Scaling |
| RDS MySQL | Database Layer |
| Security Groups | Traffic Control |
| IAM Role | Secure AWS Access |
| CloudWatch | Monitoring and Logs |

---

# Architecture Components

## 1. Web Tier

- Hosted in Public Subnets
- Receives user requests
- Managed by Auto Scaling Group
- Connected to ALB

### Security Group Rules

Inbound:
- HTTP (80)
- HTTPS (443)
- SSH (22)

Outbound:
- All Traffic

---

## 2. Application Tier

- Hosted in Private Subnets
- Processes business logic
- Receives traffic only from Web Tier

### Security Group Rules

Inbound:
- Application Port (8080)
- SSH from Bastion Host

Outbound:
- MySQL (3306)

---

## 3. Database Tier

- Amazon RDS MySQL
- Hosted in Private Subnets
- Not publicly accessible

### Security Group Rules

Inbound:
- MySQL (3306) from App Tier only

Outbound:
- Default

---

# Deployment Steps

## Step 1: Create VPC

CIDR:
10.0.0.0/16

Create:
- 2 Public Subnets
- 2 Private App Subnets
- 2 Private DB Subnets

---

## Step 2: Configure Networking

Create:
- Internet Gateway
- NAT Gateway
- Route Tables

Associate:
- Public Route Table → Public Subnets
- Private Route Table → Private Subnets

---

## Step 3: Launch Web Tier

Create EC2 instances:

Example:
- Amazon Linux 2023
- t2.micro

Install Apache:

```bash
sudo dnf update -y
sudo dnf install httpd -y
sudo systemctl enable httpd
sudo systemctl start httpd
```

---

## Step 4: Launch Application Tier

Install application dependencies.

Example:

```bash
sudo dnf update -y
```

Deploy application code.

---

## Step 5: Create RDS Database

Engine:
- MySQL

Configuration:
- Private Access
- Multi-AZ (Optional)

Create Database:

```sql
CREATE DATABASE webappdb;
```

---

## Step 6: Configure Load Balancer

Create:
- Application Load Balancer

Listeners:
- HTTP : 80
- HTTPS : 443

Attach Web Tier Target Group.

---

## Step 7: Configure Auto Scaling

Create Auto Scaling Group.

Minimum Capacity:
- 2

Desired Capacity:
- 2

Maximum Capacity:
- 4

---

# Testing

## Test Web Tier

Open:

http://ALB-DNS-NAME

Expected Output:

Application homepage loads successfully.

---

## Test Database Connectivity

```bash
mysql -h RDS-ENDPOINT -u admin -p
```

Verify:

```sql
SHOW DATABASES;
```

---

# Security Best Practices

- Use Private Subnets for App and DB Tiers.
- Restrict Security Group access.
- Enable HTTPS.
- Enable CloudWatch Monitoring.
- Use IAM Roles instead of Access Keys.
- Enable Automated RDS Backups.

---

# Monitoring

Use Amazon CloudWatch to monitor:

- CPU Utilization
- Memory Usage
- Network Traffic
- RDS Performance
- Load Balancer Metrics

---

# Expected Outcome

After deployment:

- Users access the application through ALB.
- Requests are routed to Web Tier.
- Web Tier communicates with App Tier.
- App Tier stores and retrieves data from RDS.
- Auto Scaling handles increased traffic automatically.

---

# Author

AWS Three-Tier Web Application Project
Prepared for AWS Cloud and DevOps Learning.
