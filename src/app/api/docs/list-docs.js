// import { google } from "googleapis";

// export default async function handler(req, res) {
//   const auth = new google.auth.GoogleAuth({
//     keyFilename: "./thirdeyes-a9180f08b38b.json",
//     scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
//   });

//   const drive = google.drive({ version: "v3", auth });

//   try {
//     const response = await drive.files.list({
//       pageSize: 10,
//       q: `'${folderId}' in parents`,
//       fields: "files(id, name)",
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
