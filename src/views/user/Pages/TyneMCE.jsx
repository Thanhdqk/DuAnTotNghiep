import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TyneMCE = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (newContent) => {
    console.log(newContent);
    setContent(newContent);
  };

  return (
    <div className='row'>
        
        <div className="col-md-6">

        <Editor
        apiKey='cdl7m07e6o2g3q2jko7q8ompxq0yenyd414zt85qbpdonj4i' // Sử dụng API key của bạn
        value={content}
        init={{
            height: 300,
            width: '100%',
           
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              // Bỏ bớt các plugin không cần thiết để kiểm tra
              'insertdatetime media table paste help',
            ],
            toolbar:
              'undo redo | formatselect | bold italic forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        name=""
        onEditorChange={handleEditorChange}
        className="" 
      />

        </div>

      <div className="mt-4">
        <h5 className="text-center">Output:</h5>
        <div className="border p-3" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      





    </div>
  );
}

export default TyneMCE;
