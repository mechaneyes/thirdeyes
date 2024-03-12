import { google } from "googleapis";

export async function printDocTitle(docId) {
  try {
    const response = await gapi.client.docs.documents.get({
      documentId: docId,
    });
    const doc = response.result;
    const output = `Document ${doc.title} successfully found.\n`;
    // document.getElementById("content").innerText = output;
    console.log("output", output);
  } catch (err) {
    // document.getElementById("content").innerText = err.message;
    console.log("err.message", err.message);
    return;
  }
}

export function getDocContent(docId) {
  const docs = gapi.client.docs;
  const DOCUMENT_ID = docId;
  docs.documents
    .get({
      documentId: DOCUMENT_ID,
    })
    .then(function (response) {
      const content = response.result.body.content;
      console.log("Document content:", content);
      // Process and display the content as you like
    })
    .catch(function (e) {
      console.error(e);
    });
}

// function to list all the documents in the user's drive
export async function listDocsInFolder(folderId) {
  const auth = new google.auth.GoogleAuth({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_DOCS_CLIENT_ID,
    scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  });

  const drive = google.drive({ version: "v3", auth });

  try {
    const response = await drive.files.list({
      pageSize: 10,
      q: `'${folderId}' in parents'`,
      fields: "files(id, name)",
    });
    console.log(response.data);
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

// export const fetchDocs = async () => {
//   const folderId = "1A6aA52e30QMXMVKZrF9roNPtLp_eyaXc";

//   try {
//     const response = await fetch(`/api/docs/list-docs?folderId=${folderId}`);
//     if (!response.ok) throw new Error("Failed to fetch docs");

//     const data = await response.json();
//     console.log('data', data);
//   } catch (error) {
//     console.log("Error: " + error.message);
//   } finally {
//     console.log("Done fetching docs");
//   }
// };

// async function listFiles(authClient) {
//     const drive = google.drive({ version: "v3", auth: authClient });
//     const res = await drive.files.list({
//       pageSize: 10,
//       fields: "nextPageToken, files(id, name)",
//     });
//     const files = res.data.files;
//     if (files.length === 0) {
//       console.log("No files found.");
//       return;
//     }
  
//     console.log("Files:");
//     files.map((file) => {
//       console.log(`${file.name} (${file.id})`);
//     });
//   }
  
//   authorize().then(listFiles);
