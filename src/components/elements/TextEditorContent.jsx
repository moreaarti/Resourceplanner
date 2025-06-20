import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditorContent = (props) => {
  return (
    <div className="content-tinymce-react text-content-editor " >
      <Editor
        apiKey="t33t838137q4ns7see5spqcrzrertu3pcdqrenw7zv91j41z" // Replace with your actual API key 25-10-2024
        value={props?.description}
        disabled={true} // Disable any interaction
        init={{
          readonly: true, // Make the editor read-only
          toolbar: false, // Hide the toolbar
          menubar: false, // Hide the menu bar
          plugins: ['autoresize'], // Use autoresize plugin to automatically adjust height
          autoresize_bottom_margin: 20, // Optional: Add some margin at the bottom
          body_class: 'plain-textarea', // Custom class for styling
          content_style: `body { background-color: ${props?.backgroundColor} !important;
          font-size: 14px !important;
              font-weight: 400 !important;
              outline: none !important;
              border: none !important;
              margin: 0 !important; 
              padding: 0 !important;
          }` // Optional styling
        }}
      />
    </div>
  );
};

export default TextEditorContent;
