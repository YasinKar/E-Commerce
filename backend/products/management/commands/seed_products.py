from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.utils import timezone

from faker import Faker
from PIL import Image
import random
from io import BytesIO

from products.models import (
    Category, Brand, Product,
    ProductColor, ProductSize, ProductTag,
    ProductImage, ProductInformation, ProductComment, Discount
)
from users.models import User

fake = Faker()

def generate_dummy_image(name='image.jpg', size=(300, 300)):
    image = Image.new('RGB', size, tuple(random.randint(0, 255) for _ in range(3)))
    buffer = BytesIO()
    image.save(buffer, format='JPEG')
    return ContentFile(buffer.getvalue(), name=name)

class Command(BaseCommand):
    help = 'Seed the database with demo data.'

    def add_arguments(self, parser):
        parser.add_argument('--products', type=int, default=10, help='Number of products to create')

    def handle(self, *args, **kwargs):
        product_count = kwargs['products']
        self.stdout.write("Creating Categories...")
        categories = [
            Category.objects.create(
                name=fake.word(),
                image=generate_dummy_image(f"cat_{i}.jpg")
            ) for i in range(10)
        ]

        self.stdout.write("Creating Brands...")
        brands = [
            Brand.objects.create(
                name=fake.company(),
                logo=generate_dummy_image(f"brand_{i}.jpg")
            ) for i in range(10)
        ]

        colors = [ProductColor.objects.create(color_name=['red', 'blue', 'black', 'white', 'orange'][_], color_code='#000') for _ in range(5)]
        sizes = [
            ProductSize.objects.get_or_create(
                size=_
            )[0] for _ in ['XS', 'S', 'M', 'L', 'XL', 'XXL']
        ]
        tags = [ProductTag.objects.create(tag=fake.word()) for _ in range(10)]

        users = list(User.objects.all())

        self.stdout.write("Creating Products...")
        for i in range(product_count):
            product = Product.objects.create(
                name=fake.sentence(nb_words=3),
                price=random.randint(1000, 100000),
                image=generate_dummy_image(f"product_{i}.jpg"),
                description=fake.text(),
                category=random.choice(categories),
                brand=random.choice(brands),
                gender=random.choice(['Male', 'Female', 'None']),
                stars=random.randint(1, 5),
                inventory=random.randint(1, 100)
            )
            product.colors.set(random.sample(colors, 3))
            product.sizes.set(random.sample(sizes, 2))
            product.tags.set(random.sample(tags, 2))

            for j in range(3):
                ProductImage.objects.create(product=product, image=generate_dummy_image(f"product_img_{i}_{j}.jpg"))

            for _ in range(2):
                ProductInformation.objects.create(product=product, key=fake.word(), value=fake.word())

            if users:
                for _ in range(2):
                    ProductComment.objects.create(
                        product=product,
                        user=random.choice(users),
                        title=fake.sentence(),
                        message=fake.text(),
                        recommend=random.choice([True, False]),
                        likes=random.randint(0, 10),
                        dislikes=random.randint(0, 10),
                    )

        self.stdout.write("Creating Discounts...")
        for cat in categories:
            Discount.objects.create(
                category=cat,
                discount_percentage=random.randint(5, 30),
                start_date=timezone.now() - timezone.timedelta(days=1),
                end_date=timezone.now() + timezone.timedelta(days=5)
            )

        self.stdout.write(self.style.SUCCESS("🎉 Database seeding done!"))