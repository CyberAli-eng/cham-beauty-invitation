/**
 * Cham Beauty – Guestlist form handler
 * Deploy as Web App (Execute as: Me, Who has access: Anyone) and use the URL as VITE_GAS_WEB_APP_URL.
 * Submissions are validated and sanitized before being appended. Export the sheet as CSV via File > Download > CSV.
 */

const SHEET_NAME = "Guestlist";

// Validation limits removed or significantly increased
const MAX_FULL_NAME = 1000;
const MAX_INSTAGRAM_HANDLES = 1000;
const MAX_INSTAGRAM_FOLLOWERS = 999999999999;
const MAX_SNAPCHAT = 500;
const MAX_YOUTUBE = 2000;
const MIN_ADDRESS_LENGTH = 1;
const MAX_ADDRESS_LENGTH = 5000;
const MAX_NICHE_OTHER = 500;
const VALID_NICHES = ["fashion", "beauty", "tech", "lifestyle", "travel", "food", "fitness", "entertainment", "business", "other"];
const WHATSAPP_REGEX = /^\+?[0-9\s-]+$/;
const NAME_REGEX = /.*/;
const INSTAGRAM_HANDLE_REGEX = /.*/;
const SNAPCHAT_HANDLE_REGEX = /.*/;
const ADDRESS_REGEX = /.*/;
const NICHE_OTHER_REGEX = /.*/;
const YOUTUBE_URL_REGEX = /.*/; // Relaxed

function doPost(e) {
  try {
    var body = e.postData.contents || "{}";
    var data;
    try {
      data = JSON.parse(body);
    } catch (parseErr) {
      return createResponse(400, { success: false, error: "Invalid request body" });
    }

    // Honeypot: reject if filled (bot)
    if (data.website && String(data.website).trim().length > 0) {
      return createResponse(400, { success: false, error: "Invalid submission" });
    }

    var validation = validateAndSanitize(data);
    if (!validation.valid) {
      return createResponse(400, { success: false, error: validation.error || "Validation failed" });
    }

    var row = validation.row;
    var sheet = getOrCreateSheet();
    sheet.appendRow(row);
    return createResponse(200, { success: true });
  } catch (err) {
    return createResponse(500, { success: false, error: "Server error" });
  }
}

function doGet(e) {
  return createResponse(200, { message: "Cham Beauty guestlist form endpoint. Use POST with JSON body." });
}

function validateAndSanitize(data) {
  var fullName = sanitize(data.fullName, MAX_FULL_NAME);
  if (!fullName || fullName.length < 2) {
    return { valid: false, error: "Full name is required" };
  }
  if (!NAME_REGEX.test(fullName)) {
    return { valid: false, error: "Invalid full name" };
  }

  var instagramHandles = sanitize(data.instagramHandles, MAX_INSTAGRAM_HANDLES);
  if (!instagramHandles) {
    return { valid: false, error: "Instagram handle(s) required" };
  }
  if (!INSTAGRAM_HANDLE_REGEX.test(instagramHandles)) {
    return { valid: false, error: "Invalid Instagram handle(s)" };
  }

  var instagramFollowers = String(data.instagramFollowers || "").trim();
  if (!/^\d+$/.test(instagramFollowers)) {
    return { valid: false, error: "Invalid Instagram followers" };
  }
  var followersNum = parseInt(instagramFollowers, 10);
  if (isNaN(followersNum) || followersNum < 0 || followersNum > MAX_INSTAGRAM_FOLLOWERS) {
    return { valid: false, error: "Invalid Instagram followers" };
  }

  var snapchatHandle = sanitize(data.snapchatHandle, MAX_SNAPCHAT);
  if (!snapchatHandle) {
    return { valid: false, error: "Snapchat handle required" };
  }
  if (!SNAPCHAT_HANDLE_REGEX.test(snapchatHandle)) {
    return { valid: false, error: "Invalid Snapchat handle" };
  }

  var youtubeChannel = sanitize(data.youtubeChannel, MAX_YOUTUBE);
  if (youtubeChannel && !YOUTUBE_URL_REGEX.test(youtubeChannel)) {
    return { valid: false, error: "Enter a valid YouTube channel URL" };
  }

  var residenceAddress = sanitize(data.residenceAddress, MAX_ADDRESS_LENGTH);
  if (!residenceAddress || residenceAddress.length < MIN_ADDRESS_LENGTH) {
    return { valid: false, error: "Complete address required" };
  }
  if (!ADDRESS_REGEX.test(residenceAddress)) {
    return { valid: false, error: "Invalid address" };
  }

  var niche = String(data.niche || "").trim().toLowerCase();
  if (!niche) {
    return { valid: false, error: "Niche required" };
  }
  if (VALID_NICHES.indexOf(niche) === -1) {
    // Allow "other" with custom text
    if (niche !== "other") {
      return { valid: false, error: "Invalid niche" };
    }
  }
  var nicheDisplay = niche;
  if (niche === "other" && data.nicheOther) {
    var nicheOther = sanitize(data.nicheOther, MAX_NICHE_OTHER);
    if (nicheOther) {
      if (!NICHE_OTHER_REGEX.test(nicheOther)) {
        return { valid: false, error: "Invalid niche (other)" };
      }
      nicheDisplay = nicheOther;
    } else {
      nicheDisplay = "Other";
    }
  }

  var whatsapp = String(data.whatsapp || "").replace(/\s/g, "").trim();
  if (whatsapp.length < 10 || whatsapp.length > 15) {
    return { valid: false, error: "Valid WhatsApp number required" };
  }
  if (!WHATSAPP_REGEX.test(whatsapp)) {
    return { valid: false, error: "Invalid WhatsApp number" };
  }

  if (data.comfortableSpeakingOnCamera !== true || data.okayWithRoamingQuestion !== true) {
    return { valid: false, error: "Checklist confirmation required" };
  }

  var submittedAt = data.submittedAt && String(data.submittedAt).trim() ? data.submittedAt : new Date().toISOString();

  var row = [
    fullName,
    instagramHandles,
    String(followersNum),
    snapchatHandle,
    youtubeChannel || "",
    residenceAddress,
    nicheDisplay,
    whatsapp,
    "Yes",
    "Yes",
    submittedAt,
  ];
  return { valid: true, row: row };
}

function sanitize(value, maxLength) {
  if (value == null) return "";
  var s = String(value).trim();
  if (maxLength && s.length > maxLength) {
    s = s.substring(0, maxLength);
  }
  return s;
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Full Name",
      "Instagram Handles",
      "Instagram Followers",
      "Snapchat Handle",
      "YouTube Channel",
      "Residence Address",
      "Niche",
      "WhatsApp",
      "Comfortable on Camera",
      "Okay with Roaming Questions",
      "Submitted At",
    ]);
    sheet.getRange("1:1").setFontWeight("bold");
  }
  return sheet;
}

function createResponse(status, body) {
  var output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
