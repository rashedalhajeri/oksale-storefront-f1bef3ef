
import { Order } from './orderTypes';
import { getOrderStatusText, getOrderStatusColors } from './orderStatus';

// List of realistic Arabic names
const arabicNames = [
  'راشد الهاجري',
  'سارة القحطاني',
  'عبدالله العتيبي',
  'نورة السبيعي',
  'فهد الدوسري',
  'ريم الشمري',
  'محمد البلوي',
  'لولوة الزهراني',
  'سلطان الشهراني',
  'دانة القرني',
  'ماجد العنزي',
  'هيا المطيري',
  'خالد السديس',
  'منيرة الحربي',
  'وليد الغامدي',
  'علي المالكي',
  'عهود الرشيدي',
  'بدر الجهني',
  'أريج العوفي',
  'ناصر البقمي',
  'سمية الزامل',
  'فيصل العقيل',
  'جواهر الصيعري',
  'مشعل التميمي',
  'أفنان الشنقيطي'
];

// Add mock orders generation for the front-end 
export const generateMockOrders = (storeId: string): Order[] => {
  const statuses = ['pending', 'processing', 'completed', 'cancelled'];
  const mockOrders = [];
  
  for (let i = 1; i <= 8; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
    
    // Get a random Arabic name from the list
    const customerName = arabicNames[Math.floor(Math.random() * arabicNames.length)];
    
    const order = {
      id: `order-${storeId.slice(0, 4)}-${i}`,
      rawId: `order-${storeId.slice(0, 4)}-${i}`,
      customer: customerName,
      email: `customer${i}@example.com`,
      phone: `+9665${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: createdAt.toISOString(),
      relativeTime: '1 day ago',
      timeColor: 'text-gray-500',
      amount: `${(Math.random() * 1000).toFixed(2)} ر.س`,
      rawAmount: Number((Math.random() * 1000).toFixed(2)),
      status,
      statusText: getOrderStatusText(status),
      statusColors: getOrderStatusColors(status),
      currency: 'SAR',
      created_at: createdAt.toISOString(),
      store_id: storeId,
      total_amount: Number((Math.random() * 1000).toFixed(2)),
      customer_name: customerName,
      customer_email: `customer${i}@example.com`,
      customer_phone: `+9665${Math.floor(10000000 + Math.random() * 90000000)}`,
      items: [
        {
          id: `item-${i}-1`,
          name: `منتج ${i}-1`,
          quantity: Math.floor(1 + Math.random() * 3),
          price: Number((Math.random() * 100).toFixed(2))
        },
        {
          id: `item-${i}-2`,
          name: `منتج ${i}-2`,
          quantity: Math.floor(1 + Math.random() * 2),
          price: Number((Math.random() * 200).toFixed(2))
        }
      ],
      payment_method: Math.random() > 0.5 ? 'الدفع عند الاستلام' : 'بطاقة ائتمان',
      shipping_address: `عنوان ${i}، المدينة، المنطقة`
    };
    
    mockOrders.push(order);
  }
  
  return mockOrders;
};
