import React, { useState } from 'react';

interface TopicInputFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const TopicInputForm: React.FC<TopicInputFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="topic-input" style={{ marginRight: '10px' }}>
        Enter a topic:
      </label>
      <input
        id="topic-input"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., Photosynthesis"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};

export default TopicInputForm;