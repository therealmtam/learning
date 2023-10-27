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

===============
NO CODE MIGRATION UPDATE:

GOTCHAS:
- https://discussions.apple.com/thread/254388498
1) when creating a new Photos library (Option + click on Photos app icon), sometimes the library will show the error "this item cannot be added to your photo library because it may be an unrecognizable file format" when trying to import the Photos exported media ^ (media being exported as Originals with include xmp file and aae files with images and videos).

The fix is to recreate the new Photo Library after restarting your comp.

I encountered this after creating / deleting / creating / deleting, photo libraries and all of a sudden I couldn't import the same photos I had been able to a second ago.


2) It is faster to create a new Photos Library on your comp and import files there and then move the library to an external hard drive VS create the photo library on your comp, import a photo to make sure imports to it work and you don't face GOTCHA (1) and then move the library to an external and finish importing files there.

This is because even with SSD drive, it is super slow during the import of photos to a library that is not on your computer.

I assume there is a lot of processing that happens in Photos app (pulling in the xmp files and aae files in the same directory of the media you are importing) and also indexing etc done by the app such that there is a DB and probably other things tied to the Photos app

3) It is important that when you export Photos from one Photos library, you collocate all XMP and AAE files WITH the media files (images + videos) because when you import those to a new Photos Library by dragging an image or mov from the exported folder to Photos, Photos will look for XMP and AAE files in the same directory as the media and automatically pull those in for you which is nice.



NEW PROCESS:

- create a new folder in a directory on your comp to house the exported data

- in Photos app, add the keyword "favorite" to all favorited (heart) photos in iphoto - this will be exported and tied to the original media in an accompanying xmp file along side the original media file

- in Photos app, select and export the desired media as Originals and click on selecting iptc data exported as xmp

This will take a few hours as it has to pull media from icloud and local and replicate it to your target folder. It is a reliable process, so iteration on these ^ steps is not really necessary unless there are no aae or xmp files outputed for some reason during export.

NOTE:
  - if there isn't enough space on the comp, you may not be able to export all the media. If, so move some of the desktop Photos libraries to the 2 SSDs by replicating it to BOTH first before removing it from the Mac comp.

  - if you were able to export all the photos to the target folder, CHECK THE SIZE OF THE FOLDER AGAINST THE SPACE LEFT ON YOUR COMP to ensure you have enough to duplicate all the media in Photos during import.

  If you don't have enough space, the quantity of media exported needs to be reduced so this whole process works.

- close photos and hold Option + click the Photos app icon and create a new Photos library that you will be importing the exported media into. (Note - per the Gotchas, don't do the import process on an SSD because it is way too slow. Do the importing on the mac itself then move the Photos library over to BOTH SSDs after for dual backup)

- then test whether there is GOTCHA(1) issue by dragging one of the exported media files to the new Photo Library to ensure there is no import issue.

- then if it works, drag all the rest of the media.

This will take not as long as the EXPORT step but maybe 30 to an hour for 355 GBs of media.


*/
