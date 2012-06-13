#Markdown File

This is your marketing copy. It will be rendered and displayed at
cloudflare.com/apps/your_app

##Images

You can put image links in it, and when the markdown is rendered for display on cloudflare.com
it can link to the images referenced in "detail_page" in the json file. Images are hosted in /images/apps/[APP-KEY]
and you can structure them however you want, but two images should not have the same base name, since we do not
maintian your directory structure.

An image link like the one below will work on your app page, although it will not work on GitHub.

Images must be in .png format.

![Sample image](/images/apps/sample/example.png "Has to be a png")

##Versioning

Images don't track versions. Any change to an image that is approved will be live
right away, even if the new version is still in beta. We recommend you change the image URL
if you change the image.
