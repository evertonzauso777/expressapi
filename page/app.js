import React, { useState, useRef } from 'react';

const FileUploadForm = () => {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    token: '',
    client: '',
    name: '',
    type: 'image',
    URL: '',
    base64: ''
  });
  
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Manipulador de mudança nos campos de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manipulador de seleção de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Determina o tipo do arquivo
    let fileType = 'document';
    if (file.type.startsWith('image/')) fileType = 'image';
    else if (file.type.startsWith('video/')) fileType = 'video';

    // Atualiza o tipo no formulário
    setFormData(prev => ({
      ...prev,
      type: fileType
    }));

    // Cria preview (para imagens/vídeos)
    if (fileType !== 'document') {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview('');
    }

    // Converte para Base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        base64: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.base64 && !formData.URL) {
      alert('Por favor, envie um arquivo ou forneça uma URL');
      return;
    }

    // Simulação de envio para API
    console.log('Payload enviado:', formData);
    setSubmissionStatus('success');
    
    // Limpar o formulário após 3 segundos
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Upload de Arquivo</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Token:</label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Client:</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Tipo de Arquivo:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            <option value="document">Documento</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>URL (opcional):</label>
          <input
            type="text"
            name="URL"
            value={formData.URL}
            onChange={handleInputChange}
            placeholder="https://exemplo.com/arquivo.jpg"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Arquivo (será convertido para Base64):</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={`${formData.type}/*`}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        {preview && (
          <div style={{ marginBottom: '15px' }}>
            <h3>Preview:</h3>
            {formData.type === 'image' && (
              <img src={preview} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
            )}
            {formData.type === 'video' && (
              <video src={preview} controls style={{ maxWidth: '300px', maxHeight: '300px' }} />
            )}
          </div>
        )}
        
        {formData.base64 && (
          <div style={{ marginBottom: '15px' }}>
            <h3>Base64 Gerado:</h3>
            <textarea
              value={formData.base64.substring(0, 100) + '...'} // Mostra apenas o início para não sobrecarregar a UI
              readOnly
              rows={3}
              style={{ width: '100%' }}
            />
            <p>Base64 truncado para visualização. O payload completo será enviado.</p>
          </div>
        )}
        
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Enviar
        </button>
      </form>
      
      {submissionStatus === 'success' && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#dff0d8', color: '#3c763d' }}>
          Formulário enviado com sucesso! Verifique o console para ver o payload.
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;