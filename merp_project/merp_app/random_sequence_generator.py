import random
import string


def generate_unique_code():
    characters = string.ascii_uppercase + string.digits

    generated_code = ''.join(random.choices(characters, k=7))

    return generated_code
