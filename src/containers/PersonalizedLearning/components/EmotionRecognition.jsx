import React, { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Row, Col, ProgressBar, Alert, Button } from '@openedx/paragon';
import { Mood, TrendingUp, Psychology, Insights } from '@openedx/paragon/icons';
import messages from '../messages';

const EmotionRecognition = ({ data }) => {
  const { formatMessage } = useIntl();
  const [emotionData, setEmotionData] = useState(null);

  useEffect(() => {
    // Extract emotion data from the learning analytics data
    if (data && data.emotion_analysis) {
      setEmotionData(data.emotion_analysis);
    }
  }, [data]);

  if (!emotionData) {
    return (
      <div className="text-center py-4">
        <Alert variant="info">
          <p className="mb-0">
            Dữ liệu nhận diện cảm xúc sẽ được thu thập trong quá trình học tập. 
            Hãy tiếp tục học để xem phân tích cảm xúc của bạn.
          </p>
        </Alert>
      </div>
    );
  }

  const {
    dominant_emotion = 'neutral',
    emotion_distribution = {},
    learning_mood_trends = [],
    recommendations = [],
    stress_levels = {},
    engagement_score = 0
  } = emotionData;

  const emotionColors = {
    happy: '#28a745',
    excited: '#ffc107',
    focused: '#17a2b8',
    confused: '#fd7e14',
    frustrated: '#dc3545',
    bored: '#6c757d',
    neutral: '#007bff'
  };

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'focused': return '🤔';
      case 'confused': return '😕';
      case 'frustrated': return '😤';
      case 'bored': return '😴';
      default: return '😐';
    }
  };

  const getEmotionLabel = (emotion) => {
    const labels = {
      happy: 'Vui vẻ',
      excited: 'Hứng thú',
      focused: 'Tập trung',
      confused: 'Bối rối',
      frustrated: 'Thất vọng',
      bored: 'Chán nản',
      neutral: 'Bình thường'
    };
    return labels[emotion] || emotion;
  };

  const getStressLevel = (level) => {
    if (level < 30) return { label: 'Thấp', variant: 'success' };
    if (level < 70) return { label: 'Trung bình', variant: 'warning' };
    return { label: 'Cao', variant: 'danger' };
  };

  return (
    <div className="emotion-recognition">
      {/* Current Emotional State */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div className="display-4 mb-2">
                  {getEmotionIcon(dominant_emotion)}
                </div>
                <h5 className="text-primary">
                  Trạng thái hiện tại: {getEmotionLabel(dominant_emotion)}
                </h5>
              </div>
              <p className="text-muted">
                Trạng thái cảm xúc chủ đạo trong quá trình học tập gần đây
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <Insights className="me-2 text-info" size="24" />
                <h6 className="mb-0">Mức độ tương tác</h6>
              </div>
              <div className="text-center">
                <h3 className="text-info mb-2">{engagement_score}/100</h3>
                <ProgressBar 
                  now={engagement_score} 
                  variant={engagement_score >= 80 ? 'success' : 
                          engagement_score >= 60 ? 'info' : 'warning'}
                />
                <small className="text-muted mt-1 d-block">
                  {engagement_score >= 80 ? 'Rất tích cực' :
                   engagement_score >= 60 ? 'Tích cực' :
                   engagement_score >= 40 ? 'Bình thường' : 'Cần cải thiện'}
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Emotion Distribution */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">Phân bố cảm xúc trong học tập</h6>
            </Card.Header>
            <Card.Body>
              {Object.entries(emotion_distribution).length > 0 ? (
                <div>
                  {Object.entries(emotion_distribution).map(([emotion, percentage]) => (
                    <div key={emotion} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="d-flex align-items-center">
                          <span className="me-2">{getEmotionIcon(emotion)}</span>
                          {getEmotionLabel(emotion)}
                        </span>
                        <span className="fw-medium">{Math.round(percentage)}%</span>
                      </div>
                      <ProgressBar 
                        now={percentage} 
                        style={{ 
                          height: '8px',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center">
                  Dữ liệu cảm xúc đang được thu thập...
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Stress Levels */}
        <Col md={4}>
          <Card className="mb-3">
            <Card.Header>
              <h6 className="mb-0">Mức độ căng thẳng</h6>
            </Card.Header>
            <Card.Body>
              {Object.entries(stress_levels).length > 0 ? (
                <div>
                  {Object.entries(stress_levels).map(([timeframe, level]) => {
                    const stressInfo = getStressLevel(level);
                    return (
                      <div key={timeframe} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">
                            {timeframe === 'daily' ? 'Hôm nay' :
                             timeframe === 'weekly' ? 'Tuần này' : 'Tháng này'}
                          </small>
                          <small className={`text-${stressInfo.variant}`}>
                            {stressInfo.label}
                          </small>
                        </div>
                        <ProgressBar 
                          now={level} 
                          variant={stressInfo.variant}
                          style={{ height: '6px' }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted small">Chưa có dữ liệu</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Learning Mood Trends */}
      {learning_mood_trends.length > 0 && (
        <Row className="mb-4">
          <Col md={12}>
            <Card>
              <Card.Header>
                <h6 className="mb-0">Xu hướng tâm trạng học tập</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {learning_mood_trends.slice(-7).map((trend, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-1" style={{ fontSize: '24px' }}>
                        {getEmotionIcon(trend.dominant_emotion)}
                      </div>
                      <small className="text-muted">
                        {new Date(trend.date).toLocaleDateString('vi-VN', { 
                          weekday: 'short' 
                        })}
                      </small>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <div className="d-flex align-items-center">
                  <Psychology className="me-2 text-warning" size="20" />
                  <h6 className="mb-0">Gợi ý cải thiện trạng thái học tập</h6>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  {recommendations.map((recommendation, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="d-flex">
                        <div className="me-3">
                          <div 
                            className="rounded-circle bg-light p-2"
                            style={{ width: '40px', height: '40px' }}
                          >
                            <TrendingUp size="20" className="text-success" />
                          </div>
                        </div>
                        <div>
                          <h6 className="mb-1">{recommendation.title}</h6>
                          <p className="small text-muted mb-0">
                            {recommendation.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default EmotionRecognition;
