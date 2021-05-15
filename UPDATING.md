# Automatic Updates for the Maxmind database

Maxmind databases can be downloaded (once an account and license key have been created)
using the URL <https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=YOUR_LICENSE_KEY&suffix=tar.gz>.
However there appears to be no (quickly found) way to directly download the .mmdb file, so one will have to do
the equivalent of `tar -xf` and find the .mmdb inside.

Fundamentally we need to download this file on an interval and update the (potentially very many) instances of this service.
I will express two approaches that are fundamentally similar, and where the advantages depend very much on the current infrastructure.

# AWS Lambda/Cron and S3

Using AWS terminology; however, both GCP and Azure should have functional equivalents.

Create an AWS Lambda "cron" job (aka a function that runs on an interval) and updates an S3 file
with a new Maxmind database.

Advantages:

-   scaling the service does not depend on the availability of Maxmind, only on your cloud provider
-   Maxmind has a 2000 downloads/day account limit, you will only download each database once per day no matter how much you scale the service

# Continuous Delivery

This only makes sense if there is a meaningful culture and infrastructure for continuous delivery.

Have an automated process that

-   downloads the maxmind database
-   sends an automated pull request to update the database in the repository, if it has changed
-   which causes a build (and test) of the service
-   which, if the test is successful, pushes it into production

Advantages:

-   same as AWS Lambda above
-   you keep a history of the maxmind database and approximately when it was deployed for
