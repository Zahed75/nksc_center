
import os
import django
import sys
from datetime import date

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nksc_backend.settings')
django.setup()

from about.models import AboutSection, TimelineEvent, Director, Statistic, Facility
from news.models import News, NewsCategory

def populate_data():
    print("Clearing existing data...")
    AboutSection.objects.all().delete()
    TimelineEvent.objects.all().delete()
    Director.objects.all().delete()
    Statistic.objects.all().delete()
    Facility.objects.all().delete()
    News.objects.all().delete()
    NewsCategory.objects.all().delete()

    print("Creating About Sections...")
    AboutSection.objects.create(
        title="About Nazmul Karim Study Center",
        subtitle="A Center for Sociological Excellence",
        section_type="history",
        content="The Nazmul Karim Study Center was established in honor of Professor Dr. A.K. Nazmul Karim, a pioneer in Bangladeshi sociology and the founding chairman of the Sociology Department at the University of Dhaka. Established on May 10, 2000, at the Curzon Hall, the center aims to preserve and promote Professor Karim's intellectual legacy while advancing sociological research and education."
    )
    AboutSection.objects.create(
        title="Our Mission",
        subtitle="Academic Excellence",
        section_type="mission",
        content="To preserve and promote the work and philosophy of Professor Dr. A.K. Nazmul Karim, conduct advanced research projects in sociology and related fields, and provide a platform for academic discourse and knowledge exchange."
    )
    AboutSection.objects.create(
        title="Our Vision",
        subtitle="Future Outlook",
        section_type="vision",
        content="To be a global center of excellence in sociological research and to apply research-based knowledge to address contemporary social challenges."
    )

    print("Creating Statistics...")
    Statistic.objects.create(label="Years of Activity", value="25", prefix="", suffix="+", icon="pi pi-calendar")
    Statistic.objects.create(label="Research Papers", value="500", prefix="", suffix="+", icon="pi pi-file")
    Statistic.objects.create(label="Library Resources", value="1000", prefix="", suffix="+", icon="pi pi-book")
    Statistic.objects.create(label="Successful Directors", value="5", prefix="", suffix="+", icon="pi pi-user-check")

    print("Creating Directors...")
    Director.objects.create(
        name="Professor Dr. Taiabur Rahman",
        position="Former Director",
        director_type="previous",
        period="17 May 2025 - 2026",
        bio="Professor Dr. Taiabur Rahman served as the Director of Nazmul Karim Study Center. He is a Professor at the Department of Development Studies, University of Dhaka.",
        qualifications="Ph.D. in Public Policy and Governance",
        email="taiaburrahman.dvs@du.ac.bd",
        image=None # Placeholder or file path if available
    )
    # Note: No current director created as requested "remove Professor Dr. Niaz Ahmed Khan from about only keep Professor Dr. Taiabur Rahman"

    print("Creating Timeline Events...")
    TimelineEvent.objects.create(year="2000", title="Establishment", description="Center founded on May 10, 2000.", display_order=1)
    TimelineEvent.objects.create(year="2025", title="Silver Jubilee", description="Celebrating 25 years of excellence.", display_order=5)

    print("Creating Facilities...")
    Facility.objects.create(title="Digital Library", description="Access to thousands of digital resources.", icon="pi pi-desktop")
    Facility.objects.create(title="Seminar Room", description="Fully equipped for academic events.", icon="pi pi-comments")

    print("Creating News Categories & Events...")
    cat_seminar = NewsCategory.objects.create(name="Seminars", slug="seminars", description="Academic seminars")
    cat_research = NewsCategory.objects.create(name="Research", slug="research", description="Research updates")

    News.objects.create(
        title="Annual Memorial Lecture 2025",
        slug="annual-memorial-lecture-2025",
        content="Dr. Sarah Johnson delivered the keynote on Modern Sociology Trends.",
        short_description="Dr. Sarah Johnson on 'Modern Sociology Trends'",
        category=cat_seminar,
        is_event=True,
        event_date=date(2025, 3, 15),
        event_speakers="Dr. Sarah Johnson",
        event_location="RC Majumdar Arts Auditorium",
        is_published=True
    )
    News.objects.create(
        title="Research Methodology Workshop",
        slug="research-methodology-workshop",
        content="A comprehensive workshop on qualitative research methods.",
        short_description="Advanced qualitative research techniques",
        category=cat_research,
        is_event=True,
        event_date=date(2025, 2, 28),
        event_speakers="Prof. Dr. A.K.M. Jamal Uddin",
        event_location="NKSC Seminar Room",
        is_published=True
    )

    print("Data population complete.")

if __name__ == '__main__':
    populate_data()
