
import React, { useEffect, useState } from 'react';
import { Table, Card, Tag, Button, Modal, Descriptions, Space, Tooltip, Badge, message, Select, Input, Form } from 'antd';
import {
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    TeamOutlined,
    DollarOutlined,
    CarOutlined,
    HomeOutlined,
    ReloadOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { adminService } from '../../../services/adminApi';

const { TextArea } = Input;

const CustomRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [replyForm] = Form.useForm();
    const [replying, setReplying] = useState(false);

    const destinationLabels = {
        'everest_base_camp': 'Everest Base Camp',
        'annapurna_circuit': 'Annapurna Circuit',
        'langtang_valley': 'Langtang Valley',
        'manaslu_circuit': 'Manaslu Circuit',
        'upper_mustang': 'Upper Mustang',
        'annapurna_base_camp': 'Annapurna Base Camp',
        'ghorepani_poonhill': 'Ghorepani Poon Hill',
        'kanchenjunga': 'Kanchenjunga Base Camp',
        'makalu_base_camp': 'Makalu Base Camp',
        'rolwaling_valley': 'Rolwaling Valley',
        'custom': 'Custom Route'
    };

    const statusColors = {
        pending: 'default',
        reviewed: 'processing',
        replied: 'processing',
        confirmed: 'success',
        archived: 'warning'
    };

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await adminService.getCustomTrips(
                statusFilter === 'all' ? {} : { status: statusFilter }
            );
            setRequests(res.data || []);
        } catch (error) {
            message.error(error || 'Failed to load custom trip requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter]);

    const columns = [
        {
            title: 'Request ID',
            key: 'id',
            render: (_, record) => (
                <span style={{ fontWeight: 500 }}>
                    {record._id ? `REQ-${record._id.slice(-6).toUpperCase()}` : '—'}
                </span>
            ),
        },
        {
            title: 'Client',
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>
                        {record.contactInfo?.name || record.user?.name || 'N/A'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                        {record.contactInfo?.email || record.user?.email || '—'}
                    </div>
                </div>
            ),
        },
        {
            title: 'Destination',
            key: 'destination',
            render: (_, record) => (
                <span>
                    <EnvironmentOutlined style={{ marginRight: 6, color: '#1890ff' }} />
                    {record.destinationName || (
                        record.destination === 'custom_route' || record.destination === 'custom'
                            ? record.customDestination || 'Custom Route'
                            : destinationLabels[record.destination] || record.destination
                    )}
                </span>
            ),
        },
        {
            title: 'Dates',
            key: 'dates',
            render: (_, record) => (
                <div>
                    <div>
                        <CalendarOutlined style={{ marginRight: 6 }} />
                        {record.startDate ? dayjs(record.startDate).format('YYYY-MM-DD') : '—'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                        {record.duration || 0} Days
                    </div>
                </div>
            ),
        },
        {
            title: 'Group',
            key: 'group',
            render: (_, record) => (
                <div>
                    <Badge count={record.groupSize} style={{ backgroundColor: '#52c41a' }} />
                    <span style={{ marginLeft: 8 }}>{record.groupType || '—'}</span>
                </div>
            ),
        },
        {
            title: 'Budget',
            key: 'budgetRange',
            render: (_, record) => (
                <Tag color={record.budgetRange === 'luxury' ? 'gold' : record.budgetRange === 'budget' ? 'green' : 'blue'}>
                    {record.budgetRange || 'N/A'}
                </Tag>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => {
                const status = record.status;
                const color = statusColors[status] || 'default';
                let icon = <ClockCircleOutlined />;

                if (status === 'replied') {
                    icon = <MailOutlined />;
                } else if (status === 'confirmed') {
                    icon = <CheckCircleOutlined />;
                }

                return (
                    <Tag icon={icon} color={color} style={{ textTransform: 'capitalize' }}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => showRequestDetails(record)}
                    >
                        View
                    </Button>
                    <Tooltip title="Delete request">
                        <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record._id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const showRequestDetails = (record) => {
        setSelectedRequest(record);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const updateStatus = async (id, status) => {
        setUpdatingId(id);
        try {
            await adminService.updateCustomTripStatus(id, { status });
            message.success('Status updated');
            fetchRequests();
        } catch (error) {
            message.error(error || 'Failed to update status');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this request?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await adminService.deleteCustomTrip(id);
                    message.success('Request deleted successfully');
                    fetchRequests();
                    if (selectedRequest?._id === id) {
                        setIsModalVisible(false);
                    }
                } catch (error) {
                    message.error(error || 'Failed to delete request');
                }
            },
        });
    };

    const handleReply = async (values) => {
        if (!selectedRequest?._id) return;
        setReplying(true);
        try {
            await adminService.replyToCustomTrip(selectedRequest._id, values.replyMessage);
            message.success('Reply sent successfully');
            replyForm.resetFields();
            setIsModalVisible(false);
            fetchRequests();
        } catch (error) {
            message.error(error || 'Failed to send reply');
        } finally {
            setReplying(false);
        }
    };

    const statusFilters = [
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'Pending' },
        { value: 'reviewed', label: 'Reviewed' },
        { value: 'replied', label: 'Replied' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'archived', label: 'Archived' },
    ];

    return (
        <Card
            title="Custom Trip Requests"
            bordered={false}
            className="shadow-md rounded-lg"
            extra={
                <Space>
                    <Select
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={statusFilters}
                        style={{ width: 140 }}
                        size="small"
                    />
                    <Button icon={<ReloadOutlined />} size="small" onClick={fetchRequests} />
                </Space>
            }
        >
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={requests}
                pagination={{ pageSize: 10 }}
                loading={loading}
            />

            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Request Details: {selectedRequest?._id ? `REQ-${selectedRequest._id.slice(-6).toUpperCase()}` : ''}</span>
                        <Tag color={statusColors[selectedRequest?.status] || 'orange'}>
                            {selectedRequest?.status?.toUpperCase()}
                        </Tag>
                    </div>
                }
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Close
                    </Button>,
                    <Button
                        key="reviewed"
                        type="primary"
                        icon={<CheckCircleOutlined />}
                        loading={updatingId === selectedRequest?._id}
                        onClick={() => updateStatus(selectedRequest._id, 'reviewed')}
                    >
                        Mark Reviewed
                    </Button>
                ]}
                width={800}
            >
                {selectedRequest && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Contact Info Section */}
                        <Descriptions title="Client Information" bordered column={2} size="small">
                            <Descriptions.Item label="Name" span={2}>{selectedRequest.contactInfo?.name || selectedRequest.user?.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">
                                <a href={`mailto:${selectedRequest.contactInfo?.email || selectedRequest.user?.email || ''}`}>
                                    {selectedRequest.contactInfo?.email || selectedRequest.user?.email || '—'}
                                </a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">
                                <a href={`tel:${selectedRequest.contactInfo?.phone || ''}`}>
                                    {selectedRequest.contactInfo?.phone || '—'}
                                </a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Emergency Contact">
                                {selectedRequest.contactInfo?.emergencyContact?.name || '—'} ({selectedRequest.contactInfo?.emergencyContact?.relationship || '—'})
                            </Descriptions.Item>
                            <Descriptions.Item label="Emergency Phone">
                                {selectedRequest.contactInfo?.emergencyContact?.phone || '—'}
                            </Descriptions.Item>
                        </Descriptions>

                        {/* Trip Details Section */}
                        <Descriptions title="Trip Specifications" bordered column={2} size="small">
                            <Descriptions.Item label="Destination">
                                {selectedRequest.destinationName || (
                                    selectedRequest.destination === 'custom_route' || selectedRequest.destination === 'custom'
                                        ? selectedRequest.customDestination || 'Custom Route'
                                        : selectedRequest.customDestination || selectedRequest.destination
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Dates">
                                {selectedRequest.startDate ? dayjs(selectedRequest.startDate).format('YYYY-MM-DD') : '—'} ({selectedRequest.duration || 0} Days)
                            </Descriptions.Item>
                            <Descriptions.Item label="Group Size">{selectedRequest.groupSize} ({selectedRequest.groupType || 'N/A'})</Descriptions.Item>
                            <Descriptions.Item label="Budget Range">{selectedRequest.budgetRange || '—'}</Descriptions.Item>

                            <Descriptions.Item label="Difficulty Pref">{selectedRequest.difficulty || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Experience">{selectedRequest.experienceLevel || '—'}</Descriptions.Item>
                            <Descriptions.Item label="Fitness Level">{selectedRequest.fitnessLevel || '—'}</Descriptions.Item>
                        </Descriptions>

                        {/* Logistics Section */}
                        <Descriptions title="Logistics & Preferences" bordered column={1} size="small">
                            <Descriptions.Item label="Accommodation">
                                <HomeOutlined style={{ marginRight: 8 }} />
                                {selectedRequest.accommodation || '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Meals">
                                {selectedRequest.mealPreferences?.length ? selectedRequest.mealPreferences.join(', ') : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Transport">
                                <CarOutlined style={{ marginRight: 8 }} />
                                {selectedRequest.transportation?.length ? selectedRequest.transportation.join(', ') : '—'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Services">
                                <Space>
                                    {selectedRequest.guideRequired && <Tag color="blue">Guide Required</Tag>}
                                    {selectedRequest.porterRequired && <Tag color="cyan">Porter Required</Tag>}
                                </Space>
                            </Descriptions.Item>
                        </Descriptions>

                        {/* Special Requests */}
                        {selectedRequest.specialRequests && (
                            <Card type="inner" title="Special Requests" size="small">
                                <p style={{ margin: 0 }}>{selectedRequest.specialRequests}</p>
                            </Card>
                        )}

                        {/* Previous Reply */}
                        {selectedRequest.status === 'replied' && selectedRequest.lastReply && (
                            <Card type="inner" title={<Space><MailOutlined /> Last Reply</Space>} size="small" headStyle={{ color: '#52c41a' }}>
                                <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{selectedRequest.lastReply.text}</p>
                                <div style={{ textAlign: 'right', fontSize: '11px', color: '#999', marginTop: '8px' }}>
                                    Sent by {selectedRequest.lastReply.adminName} on {dayjs(selectedRequest.lastReply.sentAt).format('YYYY-MM-DD HH:mm')}
                                </div>
                            </Card>
                        )}

                        {/* Reply Form */}
                        <Card type="inner" title="Reply to Client" size="small">
                            <Form
                                form={replyForm}
                                layout="vertical"
                                onFinish={handleReply}
                            >
                                <Form.Item
                                    name="replyMessage"
                                    required
                                    rules={[{ required: true, message: 'Please enter your reply message' }]}
                                >
                                    <TextArea rows={4} placeholder="Type your response to the client here..." />
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" loading={replying} icon={<MailOutlined />}>
                                        Send Email Reply
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                        <div style={{ textAlign: 'right', color: '#999', fontSize: '12px' }}>
                            Submitted on: {selectedRequest.createdAt ? dayjs(selectedRequest.createdAt).format('YYYY-MM-DD HH:mm') : '—'}
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default CustomRequestList;
