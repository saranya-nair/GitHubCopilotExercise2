from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        ironman = User.objects.create(email='ironman@marvel.com', username='ironman', team=marvel)
        captain = User.objects.create(email='captain@marvel.com', username='captain', team=marvel)
        batman = User.objects.create(email='batman@dc.com', username='batman', team=dc)
        superman = User.objects.create(email='superman@dc.com', username='superman', team=dc)

        # Create activities
        Activity.objects.create(user=ironman, type='run', duration=30)
        Activity.objects.create(user=batman, type='cycle', duration=45)

        # Create workouts
        Workout.objects.create(user=ironman, description='Chest day')
        Workout.objects.create(user=superman, description='Leg day')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
