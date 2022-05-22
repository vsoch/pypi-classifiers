#!/usr/bin/env python

import requests
import json
import sys
import os

here = os.path.abspath(os.path.dirname(__file__))
data = os.path.join(here, "data")

# Updated for recent Python
module = "https://raw.githubusercontent.com/pypa/trove-classifiers/main/src/trove_classifiers/__init__.py"


def main():
    text = requests.get(module).text
    exec(text)
    if "sorted_classifiers" not in locals():
        sys.exit("Failed to find classifiers variable.")

    # Write to data
    data_file = os.path.join(data, "classifiers.json")
    with open(data_file, "w") as fd:
        fd.write(json.dumps(locals()["sorted_classifiers"], indent=4))


if __name__ == "__main__":
    main()
