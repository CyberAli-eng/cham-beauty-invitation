# Google Apps Script – Guestlist to Sheet/CSV

This script receives form submissions from the Cham Beauty site and appends them to a Google Sheet. You can export the sheet as CSV anytime.

## Setup

1. **Create a new Google Sheet**  
   Go to [sheets.new](https://sheets.new) and name it (e.g. "Cham Beauty Guestlist").

2. **Open Apps Script**  
   In the sheet: **Extensions** → **Apps Script**. Delete any default code in `Code.gs`.

3. **Paste the script**  
   Copy the contents of `Code.gs` from this folder into the Apps Script editor and save.

4. **Deploy as Web App**  
   - Click **Deploy** → **New deployment**.  
   - Click the gear icon next to "Select type", choose **Web app**.  
   - **Description:** e.g. "Cham Beauty guestlist".  
   - **Execute as:** Me.  
   - **Who has access:** Anyone.  
   - Click **Deploy**, authorize when asked, then copy the **Web app URL**.

5. **Use the URL in the site**  
   - In your Cham Beauty project, create a `.env` file in the project root (same folder as `package.json`).  
   - Add:  
     `VITE_GAS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`  
     (use the full URL you copied from the deploy step).  
   - Rebuild and redeploy the site so the env variable is picked up.

## Getting data as CSV

- Open the same Google Sheet.  
- **File** → **Download** → **Comma-separated values (.csv)**.  
- The downloaded file is your guestlist in CSV format.

## Updating the script

If you change `Code.gs` here and want to update the live app:

1. In Apps Script, paste the new code and save.  
2. **Deploy** → **Manage deployments** → pencil icon on the existing deployment → **Version** → **New version** → **Deploy**.  
3. The Web app URL stays the same; no need to change `.env`.
