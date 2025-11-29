import { useState } from 'react';
import React from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './NumberIdentifier.css';

const NumberIdentifier = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleUploadBoxClick = () => {
    if (fileInputRef.current && !loading) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      setImage(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyNumber = async () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Get API key from environment variable
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        setError('API key not configured. Please set VITE_GEMINI_API_KEY in your environment.');
        setLoading(false);
        return;
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1];

        try {
          // Call Gemini API with vision capability
          const response = await model.generateContent([
            {
              inlineData: {
                mimeType: image.type,
                data: base64Image,
              },
            },
            {
              text: 'This image contains a handwritten number. Please identify and return ONLY the single digit (0-9) you see in the image. If you cannot identify a clear single digit, respond with "Cannot identify". Do not include any other text in your response.',
            },
          ]);

          const text = response.response.text().trim();
          
          // Validate the response is a single digit
          if (/^\d$/.test(text)) {
            setResult({
              number: text,
              confidence: 'High',
              raw: text,
            });
          } else if (text === 'Cannot identify') {
            setResult({
              number: null,
              confidence: 'Low',
              raw: text,
            });
            setError('Could not identify a clear handwritten number in the image');
          } else {
            // Try to extract a digit if multiple are present
            const digitMatch = text.match(/\d/);
            if (digitMatch) {
              setResult({
                number: digitMatch[0],
                confidence: 'Medium',
                raw: text,
              });
            } else {
              setError('Could not identify a handwritten number');
            }
          }
        } catch (err) {
          setError(`Error processing image: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      
      reader.readAsDataURL(image);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  const clearForm = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Handwritten Number Identifier</h1>
        <p className="subtitle">Upload an image containing a handwritten digit and let AI identify it</p>
        
        <div className="upload-section">
          <div className="upload-box" onClick={handleUploadBoxClick}>
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button className="clear-btn" onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  setPreview(null);
                }}>✕</button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Click to upload or drag and drop</p>
                <p className="file-types">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {result && (
          <div className={`result-section ${result.number !== null ? 'success' : 'info'}`}>
            {result.number !== null ? (
              <>
                <p className="result-label">Identified Number:</p>
                <div className="result-number">{result.number}</div>
                <p className="confidence">Confidence: {result.confidence}</p>
              </>
            ) : (
              <p>Could not identify a clear number in the image</p>
            )}
          </div>
        )}

        <div className="button-group">
          <button
            className="identify-btn"
            onClick={identifyNumber}
            disabled={!image || loading}
          >
            {loading ? 'Processing...' : 'Identify Number'}
          </button>
          <button
            className="clear-all-btn"
            onClick={clearForm}
            disabled={loading}
          >
            Clear
          </button>
        </div>

        <div className="info-section">
          <h3>How to use:</h3>
          <ol>
            <li>Upload an image containing a handwritten digit (0-9)</li>
            <li>Click "Identify Number" to process the image</li>
            <li>The AI will detect and display the identified digit</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NumberIdentifier;
