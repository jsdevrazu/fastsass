from faker import Faker
from bson import ObjectId
from datetime import datetime, timedelta, timezone
import random

fake = Faker()


example_user_id = ObjectId('681f3e11f6572f8b63d1e4f1')
company_ids = [ObjectId("68215c7e6d71185134efca44"), ObjectId("681f3e11f6572f8b63d1e4f0")]

experience_levels = ["entry", "mid", "senior"]
job_types = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
    "Freelance"
  ]
skills_pool = ["Python", "JavaScript", "Docker", "AWS", "MongoDB", "React", "Next.js", "Tailwind Css"]
locations = [
    "Remote",
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
    "Jamalpur",
    "Mymensingh",
    "Netrokona",
    "Sherpur",
    "Bogra",
    "Chapainawabganj",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
    "Habiganj",
    "Moulvibazar",
    "Sunamganj",
    "Sylhet"
  ]

def generate_fake_job():
    title = fake.job()
    slug = title.lower().replace(" ", "-")
    return {
        "title": title,
        "body": fake.paragraph(nb_sentences=8),
        "min_salary": random.randint(20000, 50000),
        "max_salary": random.randint(50001, 120000),
        "experience_level": random.choice(experience_levels),
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
        "application_dead_line": datetime.now(timezone.utc) + timedelta(days=random.randint(10, 60)),
        "post_by": example_user_id,
        "slug": slug,
        "location": random.choice(locations),
        "job_type": random.choice(job_types),
        "skills": random.sample(skills_pool, k=random.randint(2, 5)),
        "questions": [fake.sentence() for _ in range(random.randint(1, 3))],
        "apply_settings": "application_form",
        "job_view": random.randint(0, 1000),
        "application_email": fake.email(),
        "application_link": fake.url(),
        "company_name": random.choice(company_ids),
        "job_status": random.choice(['active', 'complete', 'closed'])
    }
