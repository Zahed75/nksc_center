
import os
import django
import sys
from datetime import datetime

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nksc_backend.settings')
django.setup()

from news.models import News, NewsCategory, Event

def populate_events():
    print("Populating events from screenshots...")

    # Ensure category exists
    category, _ = NewsCategory.objects.get_or_create(
        slug='seminars',
        defaults={'name': 'Seminars', 'description': 'Academic Seminars and Workshops'}
    )

    events_data = [
        {
            "date": "26/05/2014",
            "speaker": "ড. সিরাজুল ইসলাম চৌধুরী (Dr. Serajul Islam Choudhury)",
            "title": "আধুনিকতা ও রবীন্দ্রনাথ (Modernity & Rabindranath)",
            "lang": "bn"
        },
        {
            "date": "18/11/2014",
            "speaker": "অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque)",
            "title": "নৈতিক চেতনা ও সমাজ (Moral Consciousness & Society)",
            "lang": "bn"
        },
        {
            "date": "28/01/2015",
            "speaker": "ড. আনিসুজ্জামান (Dr. Anisuzzaman)",
            "title": "সমাজ ভাবনায় বঙ্কিম ও বিদ্যাসাগর (Bankim & Vidyasagar in Social Thought)",
            "lang": "bn"
        },
        {
            "date": "16/04/2015",
            "speaker": "আফসান চৌধুরী (Afsan Chowdhury)",
            "title": "১৯৭১ সাল এবং বাংলাদেশের স্বাধীনতা (1971 and Independence of Bangladesh)",
            "lang": "bn"
        },
        {
            "date": "26/08/2015",
            "speaker": "ড. রওনক জাহান (Dr. Rounaq Jahan)",
            "title": "মৌলবাদ ও নারী (Fundamentalism & Women)",
            "lang": "bn"
        },
        {
            "date": "28/01/2016",
            "speaker": "ড. আলী রিয়াজ (Dr. Ali Riaz)",
            "title": "The Challenges of Institutionalizing Democracy in Bangladesh",
            "lang": "en"
        },
        {
            "date": "26/05/2016",
            "speaker": "ড. এম এম আকাশ (Dr. M M Akash)",
            "title": "বাংলাদেশের কৃষি ও কৃষক (Agriculture & Farmers of Bangladesh)",
            "lang": "bn"
        },
        {
            "date": "01/08/2016",
            "speaker": "জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad)",
            "title": "বাংলাদেশের রাজনীতি: যা বলা হয় না (Politics of Bangladesh: What is Unsaid)",
            "lang": "bn"
        },
        {
            "date": "04/09/2016",
            "speaker": "অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque)",
            "title": "বর্তমান আন্দোলন ও তৎকালীন রাজনীতি (Current Movement & Politics of that Time)",
            "lang": "bn"
        },
        {
            "date": "31/01/2017",
            "speaker": "ড. গোলাম মর্তুজা (Dr. Golam Murshid)",
            "title": "বাংলাদেশের সেক্যুলারিজম (Secularism in Bangladesh)",
            "lang": "bn"
        },
        {
            "date": "30/01/2018",
            "speaker": "সৈয়দ আনোয়ার হোসেন (Syed Anwar Husain)",
            "title": "আমাদের মুক্তিযুদ্ধ: তাত্ত্বিক বয়ান (Our Liberation War: Theoretical Narrative)",
            "lang": "bn"
        },
        {
            "date": "01/03/2018",
            "speaker": "ড. অনুপম সেন (Dr. Anupam Sen)",
            "title": "সমাজ তো শুধুই সমাজ নয় (Society is not just society)",
            "lang": "bn"
        },
        {
            "date": "28/03/2018",
            "speaker": "জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad)",
            "title": "জাসদ ও বাংলাদেশের রাজনীতি (JSD & Politics of Bangladesh)",
            "lang": "bn"
        },
        {
            "date": "09/05/2018",
            "speaker": "আহমেদ রফিক (Ahmed Rafiq)",
            "title": "রবীন্দ্রনাথের রাষ্ট্রচিন্তা (Rabindranath's Political Thought)",
            "lang": "bn"
        },
        {
            "date": "29/10/2018",
            "speaker": "অধ্যাপক ড. সলিমুল্লাহ খান (Professor Dr. Salimullah Khan)",
            "title": "স্বাধীন জাতির ভাষা ও শিক্ষা প্রসঙ্গ (Context of Language & Education of an Independent Nation)",
            "lang": "bn"
        },
        {
            "date": "26/02/2019",
            "speaker": "অধ্যাপক সৈয়দ মনজুরুল ইসলাম (Professor Syed Manzoor-ul-Islam)",
            "title": "ঝুঁকির বিশ্বায়ন, সাহিত্য ও সংস্কৃতি (Globalization of Risk, Literature & Culture)",
            "lang": "bn"
        },
        {
            "date": "25/03/2019",
            "speaker": "আনু মুহাম্মদ (Anu Muhammad)",
            "title": "পুঁজির বিশ্বায়ন, স্থানীয় মানুষ, বিপন্ন প্রাণ ও প্রকৃতি (Globalization of Capital, Local People, Endangered Lives & Nature)",
            "lang": "bn"
        },
        {
            "date": "06/05/2019",
            "speaker": "স্বপন আদনান (Swapan Adnan)",
            "title": "Class, Shamaj and Shalish: Societal Maintenance, Break-ups, and the Cultural",
            "lang": "en"
        }
    ]

    count = 0
    for item in events_data:
        # Convert date
        date_obj = datetime.strptime(item['date'], '%d/%m/%Y').date()
        
        # Check if already exists to avoid dupes
        if not Event.objects.filter(title=item['title'], event_date=date_obj).exists():
            Event.objects.create(
                title=item['title'],
                slug=django.utils.text.slugify(item['title'] + '-' + item['date'].replace('/','')),
                short_description=f"Speaker: {item['speaker']}",
                content=f"<p>Seminar on <strong>{item['title']}</strong> by {item['speaker']}.</p>",
                category=category,
                is_event=True,
                event_date=date_obj,
                event_speakers=item['speaker'],
                event_location="Nazmul Karim Study Center, Dhaka University",
                is_published=True,
                language=item['lang'],
                urgency='normal',
                author='System Import'
            )
            print(f"Added: {item['title']}")
            count += 1
        else:
            print(f"Skipped (exists): {item['title']}")

    print(f"Successfully added {count} events.")

if __name__ == '__main__':
    populate_events()
