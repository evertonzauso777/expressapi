import React, { useState, useRef } from 'react';
import './FileUploadForm.css';

const FileUploadForm = () => {
  const [formData, setFormData] = useState({
    token: '',
    client: '',
    name: '',
    type: 'image',
    URL: '',
    base64: ''
  });
  
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    
    let fileType = 'document';
    if (file.type.startsWith('image/')) fileType = 'image';
    else if (file.type.startsWith('video/')) fileType = 'video';

    setFormData(prev => ({
      ...prev,
      type: fileType
    }));

    if (fileType !== 'document') {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview('');
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        base64: event.target.result
      }));
      setIsLoading(false);
    };
    reader.onloadend = () => setIsLoading(false);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.base64 && !formData.URL) {
      alert('Por favor, envie um arquivo ou forneça uma URL');
      return;
    }

    setIsLoading(true);
    setSubmissionStatus('sending');
    
    // Simulação de envio para API
    setTimeout(() => {
      console.log('Payload enviado:', formData);
      setIsLoading(false);
      setSubmissionStatus('success');
      
      setTimeout(() => {
        setSubmissionStatus(null);
        setFormData({
          token: '',
          client: '',
          name: '',
          type: 'image',
          URL: '',
          base64: ''
        });
        setPreview('');
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    }, 1500);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Upload de Arquivo</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Token</label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Tipo de Arquivo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            <option value="document">Documento</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">URL (opcional)</label>
          <input
            type="text"
            name="URL"
            value={formData.URL}
            onChange={handleInputChange}
            placeholder="https://exemplo.com/arquivo.jpg"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Arquivo (será convertido para Base64)</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={`${formData.type}/*`}
            className="form-file-input"
          />
          {fileName && <div className="file-info">Arquivo selecionado: {fileName}</div>}
        </div>
        
        {preview && (
          <div className="preview-container">
            <h3>Preview:</h3>
            <div className="media-preview">
              {formData.type === 'image' && (
                <img src={preview} alt="Preview" />
              )}
              {formData.type === 'video' && (
                <video src={preview} controls />
              )}
            </div>
          </div>
        )}
        
        {formData.base64 && (
          <div className="form-group">
            <label className="form-label">Base64 Gerado</label>
            <textarea
              value={formData.base64.substring(0, 100) + '...'}
              readOnly
              className="form-textarea"
            />
            <p className="base64-info">Base64 truncado para visualização. O payload completo será enviado.</p>
          </div>
        )}
        
        <button
          type="submit"
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      
      {submissionStatus === 'success' && (
        <div className="success-message">
          Formulário enviado com sucesso! Verifique o console para ver o payload.
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;