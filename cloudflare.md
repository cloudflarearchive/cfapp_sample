#Markdown File - cloudflare.md

cloudflare.md is your marketing copy, known as the App detail page. This content will be rendered and displayed at
cloudflare.com/apps/[APP-KEY]
where [APP-KEY] is your CloudFlare-approved key, used in the directory path, among other places.

##Images

You may put images in your App detail page, such as screenshots of how your App appears on a site.

For images to appear, you need to do three things:

 1. Add the image(s) to your repo 
 2. Reference the image(s) in the "detail_page" section of your App's cloudflare.json file.
 3. Link to the image in your App's cloudflare.md file (this page).
 
###Adding image(s) to your repo

Images __must__ be in PNG format and use the .png file extension.

Recommended: place your images within /public/images in your repo.

However, you may place images anywhere in your repo.

Make sure that images do not have the same base name. CloudFlare does not maintain your repo's directory structure when processing and referencing the images.

####Versioning

Images don't track versions. Any change to an image that is approved will be live right away, even if the new version is still in beta. We recommend you change the image URL if you change the image.

###Reference image in cloudflare.json

To be included, each image __must__ be referenced in the "assets" section, within the "detail_page" area, of the cloudflare.json file.

Example:
    
    "assets":{
        "logos" : {
        	"200px": "./public/images/logo-200.png",
        	"132px": "./public/images/logo-132.png"
            },
        "detail_page" : [
        	"./public/images/example.png"
            ]
        },

###Include image link in cloudflare.md

When the cloudflare.md markdown is rendered for display on cloudflare.com, the images used are those (a) in the repo and (b) referenced in the cloudflare.json file and (c) linked in the cloudflare.md file.

Images will be hosted in /images/apps/[APP-KEY] and the cloudflare.md link must use that reference.

An image link like the one below, for example.png, will work on your app page, although it will __not__ work on GitHub.

![Sample image](/images/apps/sample/example.png "Has to be a png")

As code:

    ![Sample image](/images/apps/sample/example.png "Has to be a png")

