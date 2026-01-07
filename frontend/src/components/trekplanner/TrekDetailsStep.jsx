import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Typography,
  Slider,
  Divider,
  Tag
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  FireOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  CompassOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const TrekDetailsStep = ({ formData, onInputChange, popularTreks }) => {
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return null;
    return dayjs(startDate).add(duration - 1, 'day');
  };

  const handleDateChange = (date) => {
    onInputChange('startDate', date);
    if (formData.duration > 0) {
      onInputChange('endDate', calculateEndDate(date, formData.duration));
    }
  };

  const handleDurationChange = (value) => {
    onInputChange('duration', value);
    if (formData.startDate) {
      onInputChange('endDate', calculateEndDate(formData.startDate, value));
    }
  };

  const renderTrekInfo = () => {
    if (formData.destination === 'everest_base_camp') {
      return (
        <div className="trek-info-content">
          <div className="trek-header" style={{ marginBottom: '1rem' }}>
            <h3 className="trek-title" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Everest Base Camp Trek</h3>
            <div className="trek-highlights" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Tag color="blue"><ClockCircleOutlined /> 12-14 days</Tag>
              <Tag color="green"><EnvironmentOutlined /> Max 5,545m</Tag>
              <Tag color="orange"><FireOutlined /> Challenging</Tag>
            </div>
          </div>
          <Paragraph className="trek-description">
            The classic trek to the base of the world's highest mountain. Experience Sherpa culture,
            stunning Himalayan views, and the famous Namche Bazaar. This iconic journey takes you through
            beautiful Sherpa villages, ancient monasteries, and breathtaking landscapes.
          </Paragraph>
          <Divider style={{ margin: '16px 0' }} />
          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-icon-wrapper"><ClockCircleOutlined /></div>
              <div>
                <div className="detail-label helper-text">Duration</div>
                <div className="detail-value">12-14 days</div>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon-wrapper"><EnvironmentOutlined /></div>
              <div>
                <div className="detail-label helper-text">Max Altitude</div>
                <div className="detail-value">5,364m (17,598 ft)</div>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon-wrapper"><FireOutlined /></div>
              <div>
                <div className="detail-label helper-text">Difficulty</div>
                <div className="detail-value">Challenging</div>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon-wrapper"><GlobalOutlined /></div>
              <div>
                <div className="detail-label helper-text">Best Season</div>
                <div className="detail-value">Mar-May, Sep-Nov</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (formData.destination === 'custom' && formData.customDestination) {
      return (
        <div className="trek-info-content">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Custom Trek: {formData.customDestination}</h3>
          <Paragraph>
            We'll work with you to create a personalized trekking experience based on your preferences.
            Our experts will contact you to discuss the details and create a custom itinerary tailored to
            your fitness level, interests, and schedule.
          </Paragraph>
          <div className="custom-trek-features" style={{ marginTop: '1rem' }}>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              <span>Personalized Itinerary</span>
            </div>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              <span>Flexible Duration</span>
            </div>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              <span>Custom Difficulty Level</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="trek-info-content">
          <div className="empty-state" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CompassOutlined style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '1rem' }} />
            <h3 style={{ color: '#4a5568', fontWeight: 600 }}>Select a Trek</h3>
            <p style={{ color: '#718096' }}>
              Choose from our popular treks or create a custom adventure.
              Each trek includes detailed information to help you make the best choice.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={3}>
          <EnvironmentOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Trek Details
        </Title>
        <Text type="secondary">
          Start planning your perfect trekking adventure
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <EnvironmentOutlined />
                </div>
                <span>Trek Selection</span>
              </div>
            }
          >
            <Form.Item
              label="Select Trek"
              name="destination"
              tooltip={{ title: "Choose from our popular treks or select custom", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              rules={[{ required: true, message: 'Please select a trek' }]}
            >
              <Select
                placeholder="Select a popular trek or choose custom"
                onChange={(value) => onInputChange('destination', value)}
                value={formData.destination}
                showSearch
                optionFilterProp="label"
                size="large"
                style={{ width: '100%' }}
              >
                {popularTreks.map(trek => (
                  <Option key={trek.value} value={trek.value}>
                    <div style={{ padding: '4px 0' }}>
                      <div className="option-title">{trek.label}</div>
                      {trek.duration && (
                        <div className="helper-text">{trek.duration} days</div>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {formData.destination === 'custom' && (
              <Form.Item
                label="Custom Destination"
                name="customDestination"
                tooltip={{ title: "Tell us about your dream trek destination", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[
                  {
                    required: formData.destination === 'custom',
                    message: 'Please specify your custom destination'
                  }
                ]}
              >
                <Input
                  placeholder="Enter your custom trek destination"
                  onChange={(e) => onInputChange('customDestination', e.target.value)}
                  value={formData.customDestination}
                  size="large"
                />
              </Form.Item>
            )}

            <div style={{ margin: '24px 0' }}>
              <Form.Item
                label="Start Date"
                name="startDate"
                tooltip={{ title: "Select your preferred start date", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please select a start date' }]}
              >
                <DatePicker
                  onChange={handleDateChange}
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf('day');
                  }}
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label={`Trek Duration: ${formData.duration} days`}
                name="duration"
                tooltip={{ title: "Adjust the slider to set your trek duration", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please select trek duration' }]}
              >
                <Slider
                  min={1}
                  max={30}
                  marks={{
                    1: '1',
                    5: '5',
                    10: '10',
                    15: '15',
                    20: '20',
                    25: '25',
                    30: '30+'
                  }}
                  onChange={handleDurationChange}
                  value={formData.duration}
                  tooltip={{ formatter: (value) => `${value} days` }}
                />
              </Form.Item>
            </div>

            {formData.startDate && formData.duration > 0 && (
              <div style={{
                display: 'flex',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '16px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#e0e7ff',
                  color: '#4f46e5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  fontSize: '1.2rem'
                }}>
                  <CalendarOutlined />
                </div>
                <div>
                  <div className="helper-text" style={{ textTransform: 'uppercase', marginBottom: '2px' }}>Your Trek Dates</div>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>
                    {dayjs(formData.startDate).format('MMM D, YYYY')} - {formData.endDate.format('MMM D, YYYY')}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    {formData.duration} {formData.duration === 1 ? 'day' : 'days'} total
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <CompassOutlined />
                </div>
                <span>Trek Information</span>
              </div>
            }
          >
            {renderTrekInfo()}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrekDetailsStep;
