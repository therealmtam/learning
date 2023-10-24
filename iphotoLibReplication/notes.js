/*
- so you need the xmp file (only downloadable via iphotos locally on desktop)
- you only need it for photos that don't have dateTime in the metadata
- then you update the photos

- download all photos with their xmp
  - then run an algo on all photos and see if they don't have date time, then go fetch date time from xmp and update the metadata of the photo
  // solves the missing time issue

  // how to transfer favorited items?
  - favorites are probably just metadata added to photos that only is stored in iphoto and not exported with photos. That is probably true of other details that only in iphoto



TODO
- solve the video timestamp problem
  - by being able to read and update the metdata of them

- solve the favorites problem
  - you can't access favorites data so you can tag the name of the image as favorited or a caption


-modify original images with

the following metadata added by iphotos:

"DateTime": {
  "id": 306,
  "value": ["2023:10:04 21:36:47"],
  "description": "2023:10:04 21:36:47"
},
"DateTimeDigitized": {
  "id": 36868,
  "value": ["2023:10:04 21:36:47"],
  "description": "2023:10:04 21:36:47"
},
"DateTimeOriginal": {
  "id": 36867,
  "value": ["2023:10:04 21:36:47"],
  "description": "2023:10:04 21:36:47"
},

"OffsetTime": {
  "id": 36880,
  "value": ["-07:00"],
  "description": "-07:00"
},
"OffsetTimeDigitized": {
  "id": 36882,
  "value": ["-07:00"],
  "description": "-07:00"
},
"OffsetTimeOriginal": {
  "id": 36881,
  "value": ["-07:00"],
  "description": "-07:00"
},


=================================
Conclusion:

To write the metadata back to the image, you would need to detect where in the image data is the exif data and modify/replace it.

this requires knowing how to detect where in the image is the header that defines exif data. And this requires understanding of the exifReader lib which has all of that logic that goes into determining this for various image types and probably various versions of the exif standards.

Because reading the exif data is one part done by these npm libs. Being able to update the exif data requires translating js objects back into exif buffer data format then replacing/inserting it in the right place within the whole image buffer. There does not seem to be libraries that do this for you.

Thus, you would have to reverse engineer how exif is tagged to be able to then properly update it in an image.

I am not going to spend the time to do this since the manual amount of work to migrate photos is cumbersome but not nearly the amount of time it has taken to research a code way to do this let alone finish a code way of doing this. Not to mention how to extract exif data from MOV files and update those too.



PART SCRIPT + MANUAL way of migrating photos:
----------------------
- First, in iPhoto, select all favorites and add the keyword "favorite" to them. This helps identify them as favorites when migrating over

When exporting these images (the originals + iptc data as xmp), we will run a script to read each of the images exported in a directory read all the xmp files of images and videos and see which images have the keyword "favorite" and print that list of image and mov file names to a txt file for me to search later in the new iphoto library to heart.

- Second, we need to do the same for photos missing datecreated info which is missing on all non apple photos. To do this, we will run a script over all of the image files exported and if they don't contain dateCreated exif data, we will read their corresponding xmp file for the creation time and output the image file name and its date created into a txt file.

Also, we will need to run a script that will extract the filename of images and videos and their created date using their xmp data.

So after import, will have 2 lists to update timestamps
1) for every image we know that does not have that created date and we need to update
2) a list of all image and video files and their created dates so for any mov files we visually see are out of sync date wise, we can search for them and find them in our printed list and copy paste over the timestamp.

===============
NO CODE MIGRATION PROCESS:
- So after writing the mainScript.js and the accompanying helpers, I realized, if I import images and video files + their xmp files and aae files into a new iphoto library, all of that metadata gets tagged again to the object including keywords!

- So that means the process to do a full migration is:
0) select all favorited photos in iphoto and add the keyword "favorite" to them

1) export all originals of photos and video from iphoto (this will export live photos as heic, mov, and xmp, and other photos as ex. jpg, xmp, aae etc.)
  - note this extraction can take hours

2) hold Option and click on the iphoto app icon to create a new photo library

3) import all originals and their aae and xmp files

4) using iphoto, search for all photos with the keyword "favorite" and do a select all and heart them

This ^ should solve the time stamp issue and favorites migration issue

*/
