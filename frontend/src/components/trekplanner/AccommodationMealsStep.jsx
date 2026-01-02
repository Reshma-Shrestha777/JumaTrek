import React from 'react';
import { Row, Col, Form, Input, Card, Typography, Divider, Radio, Checkbox } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const AccommodationMealsStep = ({ 
  formData, 
  onInputChange, 
  accommodationTypes, 
  mealPreferences 
}) => {
  return (
    <div className="step-content">
      <h3 className="text-center text-xl font-semibold mb-6">
        <HomeOutlined className="mr-2" />
        Accommodation & Meals
      </h3>
      
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Preferred Accommodation Type"
            name="accommodation"
            rules={[{ required: true, message: 'Please select accommodation type' }]}
          >
            <Radio.Group 
              onChange={(e) => onInputChange('accommodation', e.target.value)}
              value={formData.accommodation}
              className="w-full"
            >
              <Row gutter={[16, 16]}>
                {accommodationTypes.map(type => (
                  <Col xs={24} md={12} key={type.value}>
                    <Radio.Button 
                      value={type.value}
                      className="h-full w-full text-center p-4"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xl mb-1">{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </Radio.Button>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item
            label="Meal Preferences"
            name="mealPreferences"
            rules={[{ required: true, message: 'Please select at least one preference' }]}
          >
            <Checkbox.Group 
              options={mealPreferences}
              onChange={(values) => onInputChange('mealPreferences', values)}
              value={formData.mealPreferences}
              className="w-full"
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
          >
            <Input.TextArea
              rows={3}
              placeholder="Please list any food allergies, dietary restrictions, or special meal requirements..."
              value={formData.dietaryRestrictions}
              onChange={(e) => onInputChange('dietaryRestrictions', e.target.value)}
            />
          </Form.Item>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            title="Accommodation Details" 
            className="h-full"
            bordered={false}
          >
            <div className="space-y-4">
              {formData.accommodation === 'teahouse' && (
                <>
                  <Text strong>Tea House Trekking</Text>
                  <Paragraph>
                    Tea houses are simple lodges along the trekking routes that provide basic accommodation and meals. 
                    Rooms are typically twin-share with shared bathroom facilities. Most tea houses have a common dining 
                    area with a stove for warmth in the evenings.
                  </Paragraph>
                  <div className="bg-yellow-50 p-4 rounded">
                    <Text strong>What's Included:</Text>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
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
                  <Text strong>Camping Trek</Text>
                  <Paragraph>
                    On a camping trek, our staff will set up tents at designated campsites. This option provides more 
                    flexibility in terms of route and schedule, and is the only option for some remote areas.
                  </Paragraph>
                  <div className="bg-blue-50 p-4 rounded">
                    <Text strong>What's Included:</Text>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Quality two-person tents</li>
                      <li>Insulated sleeping mats</li>
                      <li>Dining tent with tables and chairs</li>
                      <li>Kitchen tent with full kitchen crew</li>
                      <li>Toilet tent</li>
                    </ul>
                  </div>
                </>
              )}
              
              <Divider />
              
              <div>
                <Text strong>Meal Information</Text>
                <Paragraph className="mt-2">
                  {formData.mealPreferences?.includes('vegetarian') && (
                    <>Vegetarian options are widely available on all treks.<br/></>
                  )}
                  {formData.mealPreferences?.includes('vegan') && (
                    <>Vegan options are available but may be limited in remote areas. Please inform us in advance.<br/></>
                  )}
                  {formData.mealPreferences?.includes('gluten_free') && (
                    <>Gluten-free options are limited in remote areas. We'll do our best to accommodate your needs.<br/></>
                  )}
                </Paragraph>
                
                <Paragraph className="mt-4">
                  <Text strong>Typical Meals:</Text>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Breakfast:</strong> Porridge, eggs, toast, pancakes, tea/coffee</li>
                    <li><strong>Lunch:</strong> Dal bhat (rice with lentil soup and vegetables), noodles, pasta</li>
                    <li><strong>Dinner:</strong> Soup, main course with rice/pasta, dessert</li>
                    <li><strong>Snacks:</strong> Biscuits, chocolate, fresh fruit (when available)</li>
                  </ul>
                </Paragraph>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccommodationMealsStep;
