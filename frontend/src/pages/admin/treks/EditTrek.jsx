import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  InputNumber,
  Upload,
  message,
  Switch,
  Divider,
  Tabs,
  Typography,
  Space,
  Alert,
  Skeleton
} from 'antd';
import {
  SaveOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { adminService, IMAGE_BASE_URL } from '../../../services/adminApi';

const { TextArea } = Input;
import RichTextEditor from '../../../components/common/RichTextEditor';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const EditTrek = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [trekData, setTrekData] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [detailedDescription, setDetailedDescription] = useState('');

  // Fetch trek data
  useEffect(() => {
    const fetchTrek = async () => {
      setLoading(true);
      try {
        const response = await adminService.getListingById(id);

        if (response.success) {
          const data = response.data;

          // Map backend fields to form fields
          const mappedData = {
            ...data,
            priceIncludes: data.includes || [],
            priceExcludes: data.excludes || [],
            detailedDescription: data.description || '',
            gallery: data.gallery ? data.gallery.map((img, idx) => ({
              uid: `original-${idx}`,
              name: img.split('/').pop(),
              status: 'done',
              url: img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`,
              thumbUrl: img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`,
              isOriginal: true,
              originalPath: img
            })) : []
          };

          setTrekData(mappedData);
          setDetailedDescription(data.description || '');
          setGalleryImages(mappedData.gallery);

          form.setFieldsValue(mappedData);
        } else {
          message.error('Failed to load trek data');
        }
      } catch (error) {
        console.error('Error fetching trek:', error);
        message.error(typeof error === 'string' ? error : 'Failed to load trek data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrek();
  }, [id, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('title', values.title);
      formData.append('description', detailedDescription || values.detailedDescription || '');
      formData.append('region', values.region);
      formData.append('difficulty', values.difficulty);
      formData.append('duration', values.duration);
      formData.append('price', values.price);
      formData.append('status', values.status);

      if (values.maxAltitude) formData.append('maxAltitude', values.maxAltitude.toString());
      if (values.groupSize) formData.append('groupSize', values.groupSize.toString());
      if (values.discountPrice) formData.append('discountPrice', values.discountPrice.toString());
      if (values.singleSupplement) formData.append('singleSupplement', values.singleSupplement.toString());
      if (values.deposit) formData.append('deposit', values.deposit.toString());

      formData.append('featured', values.featured || false);
      formData.append('groupDiscount', values.groupDiscount || false);
      formData.append('privateTrip', values.privateTrip || false);
      formData.append('startPoint', values.startPoint || '');
      formData.append('endPoint', values.endPoint || '');
      if (values.slug) formData.append('slug', values.slug);
      if (values.seoTitle) formData.append('seoTitle', values.seoTitle);
      if (values.metaDescription) formData.append('metaDescription', values.metaDescription);

      // Handle arrays
      if (values.bestSeason && Array.isArray(values.bestSeason)) {
        values.bestSeason.forEach(s => formData.append('bestSeason', s));
      }
      if (values.priceIncludes && Array.isArray(values.priceIncludes)) {
        values.priceIncludes.forEach(i => formData.append('includes', i));
      }
      if (values.priceExcludes && Array.isArray(values.priceExcludes)) {
        values.priceExcludes.forEach(e => formData.append('excludes', e));
      }

      // Handle itinerary
      if (values.itinerary && Array.isArray(values.itinerary)) {
        formData.append('itinerary', JSON.stringify(values.itinerary));
      }

      // Handle images to remove
      if (imagesToRemove.length > 0) {
        formData.append('imagesToRemove', JSON.stringify(imagesToRemove));
      }

      // Handle new image uploads from galleryImages state
      if (galleryImages && Array.isArray(galleryImages)) {
        galleryImages.forEach(file => {
          if (file.originFileObj) {
            formData.append('images', file.originFileObj);
          }
        });
      }

      const response = await adminService.updateListing(id, formData);

      if (response.success) {
        message.success('Trek updated successfully!');
        navigate('/admin/treks');
      }
    } catch (error) {
      console.error('Error updating trek:', error);
      message.error(typeof error === 'string' ? error : 'Failed to update trek. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageRemove = (file) => {
    if (file.isOriginal) {
      setImagesToRemove(prev => [...prev, file.originalPath]);
    }
  };

  const handleDetailedDescriptionChange = (content) => {
    setDetailedDescription(content);
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteListing(id);
      message.success('Trek deleted successfully');
      navigate('/admin/treks');
    } catch (error) {
      console.error('Error deleting trek:', error);
      message.error(typeof error === 'string' ? error : 'Failed to delete trek');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!trekData) {
    return (
      <div className="p-6">
        <Alert
          message="Trek not found"
          description="The trek you are looking for does not exist or has been removed."
          type="error"
          showIcon
        />
        <Button
          type="primary"
          className="mt-4"
          onClick={() => navigate('/admin/treks')}
        >
          Back to Treks
        </Button>
      </div>
    );
  }

  return (
    <div className="edit-trek-page">
      <div className="mb-6">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/treks')}
          className="mb-4"
        >
          Back to Treks
        </Button>
        <div className="flex justify-between items-center">
          <div>
            <Title level={3}>Edit Trek</Title>
            <Text type="secondary">Update the details of this trek package</Text>
          </div>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this trek? This action cannot be undone.')) {
                handleDelete();
              }
            }}
          >
            Delete Trek
          </Button>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={trekData}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
        >
          <TabPane tab="Basic Information" key="basic">
            <Row gutter={24}>
              <Col xs={24} md={16}>
                <Card className="mb-6">
                  <Form.Item
                    label="Trek Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter trek title' }]}
                  >
                    <Input placeholder="E.g., Everest Base Camp Trek" size="large" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Region"
                        name="region"
                        rules={[{ required: true, message: 'Please select a region' }]}
                      >
                        <Select placeholder="Select region" size="large">
                          <Option value="Everest">Everest Region</Option>
                          <Option value="Annapurna">Annapurna Region</Option>
                          <Option value="Langtang">Langtang Region</Option>
                          <Option value="Manaslu">Manaslu Region</Option>
                          <Option value="Mustang">Mustang Region</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Difficulty"
                        name="difficulty"
                        rules={[{ required: true, message: 'Please select difficulty' }]}
                      >
                        <Select placeholder="Select difficulty" size="large">
                          <Option value="Easy">Easy</Option>
                          <Option value="Moderate">Moderate</Option>
                          <Option value="Challenging">Challenging</Option>
                          <Option value="Strenuous">Strenuous</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Duration (Days)"
                        name="duration"
                        rules={[{ required: true, message: 'Please enter duration' }]}
                      >
                        <InputNumber
                          min={1}
                          max={100}
                          className="w-full"
                          size="large"
                          placeholder="e.g., 14"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Detailed Description"
                    name="detailedDescription"
                    rules={[{ required: true, message: 'Please enter detailed description' }]}
                  >
                    <RichTextEditor onChange={handleDetailedDescriptionChange} value={detailedDescription} />
                  </Form.Item>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="mb-6">
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select status' }]}
                  >
                    <Select>
                      <Option value="draft">Draft</Option>
                      <Option value="published">Published</Option>
                      <Option value="archived">Archived</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Featured Trek"
                    name="featured"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    label="Allow Group Discounts"
                    name="groupDiscount"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    label="Allow Private Trips"
                    name="privateTrip"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Card>

                <Card title="SEO Settings" className="mb-6">
                  <Form.Item
                    label="SEO Title"
                    name="seoTitle"
                    tooltip="This will be used in the browser tab and search results"
                  >
                    <Input placeholder="E.g., Everest Base Camp Trek - 14 Days | JumaTrek" />
                  </Form.Item>

                  <Form.Item
                    label="Meta Description"
                    name="metaDescription"
                    tooltip="Brief summary of the page for search engines"
                  >
                    <TextArea rows={3} maxLength={160} showCount />
                  </Form.Item>

                  <Form.Item
                    label="Slug"
                    name="slug"
                    tooltip="URL-friendly version of the name"
                    rules={[
                      { required: true, message: 'Please enter URL slug' },
                      {
                        pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: 'Only lowercase letters, numbers, and hyphens. No spaces or special characters.',
                      },
                    ]}
                  >
                    <Input placeholder="everest-base-camp-trek" addonBefore="jumatrek.com/treks/" />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Pricing" key="pricing">
            <Card title="Pricing Information">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Price per person ($)"
                    name="price"
                    rules={[{ required: true, message: 'Please enter price' }]}
                  >
                    <InputNumber
                      min={0}
                      className="w-full"
                      size="large"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Discount Price ($)"
                    name="discountPrice"
                  >
                    <InputNumber
                      min={0}
                      className="w-full"
                      size="large"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      placeholder="Leave empty for no discount"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Single Supplement ($)"
                    name="singleSupplement"
                  >
                    <InputNumber
                      min={0}
                      className="w-full"
                      size="large"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      placeholder="Additional cost for single room"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Deposit Required ($)"
                name="deposit"
                rules={[{ required: true, message: 'Please enter deposit amount' }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  size="large"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                label="Price Includes"
                name="priceIncludes"
                rules={[{ required: true, message: 'Please specify what\'s included' }]}
              >
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Add items included in price"
                  tokenSeparators={[',']}
                />
              </Form.Item>

              <Form.Item
                label="Price Excludes"
                name="priceExcludes"
              >
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Add items not included in price"
                  tokenSeparators={[',']}
                />
              </Form.Item>
            </Card>
          </TabPane>
          <TabPane tab="Media" key="media">
            <Card title="Trek Media" className="mb-6">
              <Form.Item
                label="Images (First will be featured)"
                name="gallery"
                valuePropName="fileList"
                getValueFromEvent={e => e && Array.isArray(e.fileList) ? e.fileList : []}
              >
                <Upload
                  multiple
                  listType="picture-card"
                  beforeUpload={() => false}
                  onRemove={handleImageRemove}
                  onChange={({ fileList }) => setGalleryImages(fileList)}
                  fileList={galleryImages}
                >
                  {galleryImages.length < 10 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                  Upload up to 10 images. The first image in the list will be treated as the main featured image.
                </Text>
              </Form.Item>
            </Card>
          </TabPane>
        </Tabs>

        <div className="sticky bottom-0 bg-white border-t p-4 -mx-6 -mb-6 mt-6 flex justify-end gap-4">
          <Button
            onClick={() => navigate('/admin/treks')}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            icon={<SaveOutlined />}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div >
  );
};

export default EditTrek;
