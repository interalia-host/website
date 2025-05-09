## **1\. Overview**

DecapCMS is a Git-based content management system that allows editors to manage content via a friendly admin interface, while storing all changes in a Git repository. This means:

* Every change to site content is version-controlled.  
* Editors work in a user-friendly interface without having to manually edit files in a text editor.  
* Changes can be reviewed and approved before they go live if the **Editorial Workflow** is enabled.

---

## **2\. Logging In**

1. Go to your CMS admin URL.  
   * Currently the CMS is available at the following URL `https://interalia.host/admin/`.  
2. Based on the current setup, you may be prompted to log in via:  
   * Your GitHub account  
3. Once logged in, you will see the **Collections** view in the left sidebar.

---

## **3\. Editorial Workflow**

This site uses `publish_mode: editorial_workflow`. This means:

* When you **create** or **edit** an entry, it will go into a “draft” or “in review” state.  
* An admin or reviewer must **approve** and **publish** changes before they become live.  
* DecapCMS automatically creates a branch in the repository for these changes. Once approved, the branch is merged into the main branch.

**Typical flow**:

1. **Draft**  
   You create or edit content and save it as a draft.  
2. **Review**  
   An admin or designated reviewer reviews the entry, possibly requesting changes.  
3. **Publish**  
   Once approved, the content is published, and the changes go live on the website.

---

## **4\. Collections Overview**

Collections are distinct content types or sections. Each collection in this `config.yml` is defined with fields that determine what editors can modify. Below is a breakdown of each collection.

### **Single Pages**

* **Name in CMS**: `page`  
* **Folder**: `content`  
* **Description**: Manage content for single pages stored in the `content` folder.  
* **Key Fields**:  
  1. **Title** (`title`): String field for the page title.  
  2. **Order** (`weight`): Number field (optional); can be used for navigation ordering.  
  3. **Cover Image** (`cover`): Image field for a hero or feature image.  
  4. **Is it part of the top navigation?** (`navbar`): Boolean toggle.  
  5. **Is it part of the footer navigation?** (`footer`): Boolean toggle.  
  6. **Description** (`description`): **Markdown** text for a summary or introduction.  
  7. **Body** (`body`): **Markdown** field for the main content of the page.

**Usage**:

* Click **New Page** to create a new single page.  
* Fill out the fields and **Save**.

---

### **Site Settings**

* **Name in CMS**: `settings`  
* **Files**:  
  * **Site Metadata** (`config/_default/params.yml`)

Within **Site Metadata**, you can manage:

1. **Site Description** (`description`): The main meta description for SEO and social sharing.  
2. **Keywords** (`keywords`): Comma-separated list of keywords for SEO.  
3. **Sharing image** (`images` list): Defines default images for social sharing.  
4. **Hero Video** (`hero_video`): The homepage hero background video.  
5. **Favicon Colors** (`favicon` object):  
   * **Mask Color** (`color.mask`)  
   * **MS Application Color** (`color.msapplication`)  
6. **Social Media Links** (`social` list): Each item has:  
   * **Platform** (`name`): Font Awesome brand name (e.g. `facebook`, `x-twitter`, `instagram`, etc.).  
   * **URL** (`url`)  
7. **Contact Information** (`contact` object):  
   * Organization name, address, city/state/zip, emails (list), phone (object).  

---

## **5\. Media and File Uploads**

According to the config:

* **media\_folder**: `static/media/uploads`  
* **public\_folder**: `/media/uploads`

This means any image, PDF, or other file you upload via the CMS will be stored in `static/media/uploads` in your repository, and referenced on the site at `/media/uploads/filename`.

**Note**: If you upload a file through a field (e.g., an image or PDF), the system will place it in the configured media folder. Make sure to provide alt text or descriptive filenames if relevant.

---

## **6\. Slug Configuration**

The `slug` section in the config:

* **encoding: "ascii"**: Converts any special characters into ASCII-friendly slugs (e.g., “é” → “e”).  
* **clean\_accents: true**: Removes or normalizes accent marks.  
* **sanitize\_replacement**: `"-"` indicates spaces and invalid characters will be replaced by hyphens.

**Effect**: If you title a page “Hello World\!”, the slug might become `hello-world`.

---

