import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { uploadFile } from '../../services/ApiProtected';

const TextEditor = (props) => {
  const editorRef = useRef(null);

  const imagesUploadHandler = async (blobInfo, success, failure) => {
    const notification = editorRef.current.notificationManager.open({
      text: 'Uploading image...',
      type: 'info',
      timeout: 0
    });

    try {
      const media = await uploadFile(blobInfo.blob());
      const imageUrl = media.guid.rendered;
      success(imageUrl);

      editorRef.current.notificationManager.close(notification);
      editorRef.current.notificationManager.open({
        text: 'Image uploaded successfully!',
        type: 'success',
        timeout: 2000
      });
    } catch (error) {
      editorRef.current.notificationManager.close(notification);
      editorRef.current.notificationManager.open({
        text: 'Image upload failed: ' + error.message,
        type: 'error',
        timeout: 2000
      });

      failure('Image upload failed: ' + error.message);
    }
  };

  const handleEditorChange = (content) => {
    props?.onChange(content);
  };

  return (
    <div className='text-editor-react'>
      <Editor
        apiKey="t33t838137q4ns7see5spqcrzrertu3pcdqrenw7zv91j41z"
        init={{
          width: '100%',
          height: props?.height,
          menubar: false,
          plugins: [
            'advlist', // Make sure advlist is first
            'lists',   // Add lists plugin separately
            'autolink',
            'link',
            'image',
            'charmap',
            'print',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'paste',
            'help',
            'wordcount'
          ],
          toolbar: 'undo redo | formatselect | bold italic backcolor | ' +
                   'alignleft aligncenter alignright alignjustify | ' +
                   'bullist numlist outdent indent | removeformat | help',
          content_style: `
            body { 
              background-color: #ffffff;
              color: #333333;
            }
            body[data-mce-placeholder]:before {
              color: #6B7280;
              font-style: italic;
            }
          `,
          placeholder: props?.descriptionPlaceholder || 'Start typing here...',
          images_upload_handler: imagesUploadHandler,
          setup: (editor) => {
            editor.on('paste', async (e) => {
              const items = e.clipboardData.items;
              let hasImage = false;

              for (let i = 0; i < items.length; i++) {
                if (items[i].type.startsWith('image/')) {
                  const file = items[i].getAsFile();
                  const blobInfo = { blob: () => file };
                  hasImage = true;

                  e.preventDefault();

                  try {
                    const url = await new Promise((resolve, reject) => {
                      imagesUploadHandler(blobInfo, resolve, reject);
                    });
                    editor.insertContent(`<img src="${url}" />`);
                  } catch (error) {
                    console.error('Image upload failed:', error);
                  }
                  break;
                }
              }

              if (!hasImage) {
                return;
              }
            });
          },
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;