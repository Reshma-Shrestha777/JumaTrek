import React from 'react';
import {
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  Card,
  Typography,
  Divider,
  Alert,
  Tag,
  Progress,
  Tooltip
} from 'antd';
import {
  TeamOutlined,
  SafetyOutlined,
  HeartOutlined,
  ToolOutlined,
  InfoCircleOutlined,
  UserOutlined,
  HeartFilled,
  StarFilled
} from '@ant-design/icons';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const GroupExperienceStep = ({ formData, onInputChange, groupTypes, experienceLevels, fitnessLevels }) => {
  // Helper function to get fitness tips based on level
  const getFitnessTips = (level) => {
    const tips = {
      low: 'Consider starting with easier trails and gradually increasing difficulty.',
      average: 'You can handle moderate trails with some elevation gain. Consider training for more challenging treks.',
      good: 'You\'re ready for most treks. Consider high-altitude challenges with proper acclimatization.',
      excellent: 'You can tackle the most challenging treks, including high-altitude and technical routes.'
    };
    return tips[level] || 'Select your fitness level to see personalized recommendations.';
  };
  const getExperienceProgress = (level) => {
    const levels = { beginner: 0, intermediate: 33, experienced: 66, expert: 100 };
    return levels[level] || 0;
  };

  const getFitnessLevel = (level) => {
    const levels = {
      low: { color: 'red', text: 'Low' },
      average: { color: 'orange', text: 'Average' },
      good: { color: 'blue', text: 'Good' },
      excellent: { color: 'green', text: 'Excellent' }
    };
    return levels[level] || { color: 'gray', text: 'Not specified' };
  };

  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={3}>
          <TeamOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Group & Experience
        </Title>
        <Text type="secondary">
          Tell us about your group to help us plan the perfect trekking experience
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card
            className="step-card"
            style={{ marginBottom: '24px' }}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <UserOutlined />
                </div>
                <span>Group Information</span>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Form.Item
                label="Group Size"
                name="groupSize"
                tooltip={{ title: "Number of people in your group", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please enter group size' }]}
              >
                <InputNumber
                  min={1}
                  max={20}
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(value) => onInputChange('groupSize', value)}
                  value={formData.groupSize}
                />
              </Form.Item>

              <Form.Item
                label="Group Type"
                name="groupType"
                tooltip={{ title: "Select the category that best describes your group", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please select group type' }]}
              >
                <Select
                  size="large"
                  onChange={(value) => onInputChange('groupType', value)}
                  value={formData.groupType}
                >
                  {groupTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Age Range"
                name="ageRange"
                tooltip={{ title: "Age range of participants in your group", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              >
                <div className="age-range-inputs">
                  <InputNumber
                    min={5}
                    max={80}
                    size="large"
                    placeholder="Min"
                    value={formData.ageRange?.min}
                    onChange={(value) => onInputChange('ageRange', {
                      ...formData.ageRange,
                      min: value
                    })}
                  />
                  <span className="separator">to</span>
                  <InputNumber
                    min={5}
                    max={80}
                    size="large"
                    placeholder="Max"
                    value={formData.ageRange?.max}
                    onChange={(value) => onInputChange('ageRange', {
                      ...formData.ageRange,
                      max: value
                    })}
                  />
                  <span className="separator">years</span>
                </div>
              </Form.Item>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ position: 'sticky', top: '24px' }}>
            <Card
              className="step-card"
              style={{ marginBottom: '24px' }}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="card-icon-wrapper">
                    <StarFilled />
                  </div>
                  <span>Experience & Fitness</span>
                </div>
              }
            >
              <div>
                {/* Experience Level Section */}
                <div style={{ marginBottom: '24px' }}>
                  <Form.Item
                    label="Trekking Experience"
                    name="experienceLevel"
                    tooltip={{ title: "Select your group's highest trekking experience level", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                    rules={[{ required: true, message: 'Please select experience level' }]}
                  >
                    <Select
                      size="large"
                      onChange={(value) => onInputChange('experienceLevel', value)}
                      value={formData.experienceLevel}
                      placeholder="Select experience level"
                    >
                      {experienceLevels.map(level => (
                        <Option key={level.value} value={level.value}>
                          <div style={{ padding: '4px 0' }}>
                            <div className="option-title">{level.label}</div>
                            <div className="helper-text">{level.description}</div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {formData.experienceLevel && (
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '16px',
                      marginTop: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        <span>Experience Level</span>
                        <span style={{ fontWeight: 600, color: '#4f46e5' }}>
                          {experienceLevels.find(l => l.value === formData.experienceLevel)?.label}
                        </span>
                      </div>
                      <Progress
                        percent={getExperienceProgress(formData.experienceLevel)}
                        showInfo={false}
                        strokeColor="#4f46e5"
                        trailColor="#e0e7ff"
                        className="experience-progress"
                      />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: '#94a3b8',
                        marginTop: '4px'
                      }}>
                        <span>Beginner</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  )}
                </div>

                <Divider style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />

                {/* Fitness Level Section */}
                <div>
                  <Form.Item
                    label="Fitness Level"
                    name="fitnessLevel"
                    tooltip={{ title: "Select your group's average fitness level", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                    rules={[{ required: true, message: 'Please select fitness level' }]}
                  >
                    <Select
                      size="large"
                      onChange={(value) => onInputChange('fitnessLevel', value)}
                      value={formData.fitnessLevel}
                      placeholder="Select fitness level"
                    >
                      {fitnessLevels.map(level => (
                        <Option key={level.value} value={level.value}>
                          <div style={{ padding: '4px 0' }}>
                            <div className="option-title">{level.label}</div>
                            <div className="helper-text">{level.description}</div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {formData.fitnessLevel && (
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '16px',
                      marginTop: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Fitness Assessment:</span>
                        <Tag
                          color={getFitnessLevel(formData.fitnessLevel).color}
                          className="fitness-tag"
                        >
                          {getFitnessLevel(formData.fitnessLevel).text}
                        </Tag>
                      </div>
                      <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                        {getFitnessTips(formData.fitnessLevel)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            <Card
              className="step-card"
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SafetyOutlined style={{ color: '#ef4444', marginRight: '8px', fontSize: '18px' }} />
                  <span>Safety & Recommendations</span>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Alert
                  message="Altitude Sickness Warning"
                  description="Most treks in Nepal reach high altitudes. Proper acclimatization is crucial to prevent AMS (Acute Mountain Sickness)."
                  type="warning"
                  showIcon
                />

                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontWeight: 500, color: '#1e40af', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <HeartFilled style={{ color: '#ef4444', marginRight: '8px' }} />
                    Personalized Recommendations
                  </div>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, fontSize: '14px', color: '#374151' }}>
                    {formData.experienceLevel === 'beginner' && (
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ color: '#10b981', marginRight: '8px' }}>✓</span>
                        <span>Start with a shorter trek to acclimate to the altitude</span>
                      </li>
                    )}
                    {formData.ageRange?.max > 50 && (
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ color: '#10b981', marginRight: '8px' }}>✓</span>
                        <span>Additional rest days for better acclimatization</span>
                      </li>
                    )}
                    {formData.groupType === 'family' && (
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ color: '#10b981', marginRight: '8px' }}>✓</span>
                        <span>Family-friendly routes with shorter walking days</span>
                      </li>
                    )}
                    <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ color: '#10b981', marginRight: '8px' }}>✓</span>
                      <span>Proper travel insurance covering high-altitude trekking</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', marginRight: '8px' }}>✓</span>
                      <span>Pre-trek fitness preparation program</span>
                    </li>
                  </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#dbeafe',
                      padding: '8px',
                      borderRadius: '8px',
                      marginRight: '12px',
                      color: '#2563eb'
                    }}>
                      <SafetyOutlined />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>Safety First</Text>
                      <Paragraph style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                        Our guides are trained in wilderness first aid and carry comprehensive first aid kits.
                        We monitor altitude sickness symptoms and have emergency evacuation plans in place.
                      </Paragraph>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#dcfce7',
                      padding: '8px',
                      borderRadius: '8px',
                      marginRight: '12px',
                      color: '#16a34a'
                    }}>
                      <HeartOutlined />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>Responsible Tourism</Text>
                      <Paragraph style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                        We follow Leave No Trace principles, support local communities, and ensure fair treatment
                        and proper equipment for all our staff.
                      </Paragraph>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#fef3c7',
                      padding: '8px',
                      borderRadius: '8px',
                      marginRight: '12px',
                      color: '#d97706'
                    }}>
                      <ToolOutlined />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>Quality Equipment</Text>
                      <Paragraph style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                        We use high-quality, well-maintained equipment for all our treks. Tents, sleeping bags,
                        and other gear are regularly inspected and replaced as needed.
                      </Paragraph>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 500, color: '#1f2937', marginBottom: '8px' }}>Need help choosing?</div>
                  <Paragraph style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                    Our trekking experts can help you select the perfect trek based on your group's
                    experience and fitness levels. Contact us for personalized recommendations.
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card className="step-card" style={{ marginTop: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#2563eb', marginBottom: '8px' }}>24/7</div>
                <div style={{ color: '#4b5563', marginBottom: '12px' }}>Support Available</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Have questions? Our team is here to help you plan your perfect trekking adventure.
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GroupExperienceStep;
