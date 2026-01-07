import React from 'react';
import { Row, Col, Form, Input, Card, Typography, Divider, Radio, Checkbox, Tooltip } from 'antd';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const AccommodationMealsStep = ({
  formData,
  onInputChange,
  accommodationTypes,
  mealPreferences
}) => {
  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography.Title level={3}>
          <HomeOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Accommodation & Meals
        </Typography.Title>
        <Text type="secondary">
          Choose your staying and dining preferences
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title="Preferences"
          >
            <Form.Item
              label="Preferred Accommodation Type"
              name="accommodation"
              tooltip={{ title: "Select where you would like to stay during the trek", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              rules={[{ required: true, message: 'Please select accommodation type' }]}
            >
              <Radio.Group
                onChange={(e) => onInputChange('accommodation', e.target.value)}
                value={formData.accommodation}
                style={{ width: '100%' }}
              >
                <Row gutter={[16, 16]}>
                  {accommodationTypes.map(type => (
                    <Col span={12} key={type.value}>
                      <Radio.Button
                        value={type.value}
                        style={{
                          height: 'auto',
                          width: '100%',
                          textAlign: 'center',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          border: formData.accommodation === type.value ? '1px solid #1a73e8' : '1px solid #d9d9d9',
                          backgroundColor: formData.accommodation === type.value ? '#e8f0fe' : '#fff'
                        }}
                      >
                        <span style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}>{type.icon}</span>
                        <span style={{ fontWeight: 500 }}>{type.label}</span>
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Meal Preferences"
              name="mealPreferences"
              tooltip={{ title: "Select your dietary preferences", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              rules={[{ required: true, message: 'Please select at least one preference' }]}
            >
              <Checkbox.Group
                options={mealPreferences}
                onChange={(values) => onInputChange('mealPreferences', values)}
                value={formData.mealPreferences}
                style={{ width: '100%' }}
              >
                <Row gutter={[16, 8]}>
                  {mealPreferences.map(pref => (
                    <Col xs={12} sm={8} key={pref.value}>
                      <Checkbox value={pref.value}>{pref.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              tooltip={{ title: "Any specific allergies or restrictions we should be aware of?", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please list any food allergies, dietary restrictions, or special meal requirements..."
                value={formData.dietaryRestrictions}
                onChange={(e) => onInputChange('dietaryRestrictions', e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title="Accommodation Details"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formData.accommodation === 'teahouse' && (
                <>
                  <Text strong style={{ fontSize: '16px' }}>Tea House Trekking</Text>
                  <Paragraph style={{ color: '#4b5563' }}>
                    Tea houses are simple lodges along the trekking routes that provide basic accommodation and meals.
                    Rooms are typically twin-share with shared bathroom facilities. Most tea houses have a common dining
                    area with a stove for warmth in the evenings.
                  </Paragraph>
                  <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                    <Text strong style={{ color: '#d97706' }}>What's Included:</Text>
                    <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: 0, color: '#4b5563' }}>
                      <li>Basic private rooms (twin or double)</li>
                      <li>Common dining area</li>
                      <li>Hot showers (usually available for a small fee)</li>
                      <li>Charging facilities (may require payment)</li>
                      <li>WiFi (available in some locations for a fee)</li>
                    </ul>
                  </div>
                </>
              )}

              {formData.accommodation === 'camping' && (
                <>
                  <Text strong style={{ fontSize: '16px' }}>Camping Trek</Text>
                  <Paragraph style={{ color: '#4b5563' }}>
                    On a camping trek, our staff will set up tents at designated campsites. This option provides more
                    flexibility in terms of route and schedule, and is the only option for some remote areas.
                  </Paragraph>
                  <div style={{ backgroundColor: '#e0f2fe', padding: '16px', borderRadius: '8px', border: '1px solid #7dd3fc' }}>
                    <Text strong style={{ color: '#0284c7' }}>What's Included:</Text>
                    <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: 0, color: '#4b5563' }}>
                      <li>Quality two-person tents</li>
                      <li>Insulated sleeping mats</li>
                      <li>Dining tent with tables and chairs</li>
                      <li>Kitchen tent with full kitchen crew</li>
                      <li>Toilet tent</li>
                    </ul>
                  </div>
                </>
              )}

              <Divider style={{ margin: '16px 0' }} />

              <div>
                <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>Meal Information</Text>
                <Paragraph style={{ color: '#4b5563', marginBottom: '16px' }}>
                  {formData.mealPreferences?.includes('vegetarian') && (
                    <>Vegetarian options are widely available on all treks.<br /></>
                  )}
                  {formData.mealPreferences?.includes('vegan') && (
                    <>Vegan options are available but may be limited in remote areas. Please inform us in advance.<br /></>
                  )}
                  {formData.mealPreferences?.includes('gluten_free') && (
                    <>Gluten-free options are limited in remote areas. We'll do our best to accommodate your needs.<br /></>
                  )}
                </Paragraph>

                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <Text strong>Typical Meals:</Text>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: 0, color: '#4b5563' }}>
                    <li><strong>Breakfast:</strong> Porridge, eggs, toast, pancakes, tea/coffee</li>
                    <li><strong>Lunch:</strong> Dal bhat (rice with lentil soup and vegetables), noodles, pasta</li>
                    <li><strong>Dinner:</strong> Soup, main course with rice/pasta, dessert</li>
                    <li><strong>Snacks:</strong> Biscuits, chocolate, fresh fruit (when available)</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccommodationMealsStep;
