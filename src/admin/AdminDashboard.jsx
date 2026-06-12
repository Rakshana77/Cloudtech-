import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { brandService } from '../services/brandService';
import { quotationService } from '../services/quotationService';
import { 
  Package, 
  Tags, 
  Award, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Eye, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    brands: 0,
    quotations: 0,
    lowStock: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentQuotations, setRecentQuotations] = useState([]);

  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');

  const seedProductsData = async () => {
    setSeeding(true);
    setSeedStatus('Importing catalog parameters...');
    
    const productsToSeed = [
      {
        productName: "Dell Latitude 5420 Business Laptop",
        sku: "DL-LAT-5420",
        brand: "Dell",
        category: "Business Laptops",
        price: 1299.00,
        offerPrice: 1199.00,
        stockQuantity: 15,
        status: "active",
        featured: true,
        description: "Professional business laptop powered by Intel Core i5 11th Gen with 16GB RAM and 512GB SSD.",
        specifications: [
          "CPU: Intel Core i5-1145G7",
          "RAM: 16GB DDR4",
          "Storage: 512GB PCIe NVMe SSD",
          "Display: 14.0\" FHD (1920x1080) Anti-Glare",
          "OS: Windows 11 Pro"
        ].join('\n')
      },
      {
        productName: "HP EliteBook 840 G8",
        sku: "HP-ELT-840G8",
        brand: "HP",
        category: "Business Laptops",
        price: 1499.00,
        offerPrice: 1399.00,
        stockQuantity: 12,
        status: "active",
        featured: true,
        description: "Premium enterprise laptop with sleek aluminum chassis, Intel Core i7, and advanced collaboration features.",
        specifications: [
          "CPU: Intel Core i7-1165G7",
          "RAM: 16GB DDR4",
          "Storage: 512GB PCIe NVMe SSD",
          "Display: 14\" FHD IPS Anti-Glare",
          "OS: Windows 11 Pro"
        ].join('\n')
      },
      {
        productName: "Lenovo ThinkPad T14 Gen 2",
        sku: "LN-THINK-T14",
        brand: "Lenovo",
        category: "Business Laptops",
        price: 1599.00,
        offerPrice: 1499.00,
        stockQuantity: 10,
        status: "active",
        featured: true,
        description: "The gold standard for business productivity and durability with AMD Ryzen 7 PRO processors.",
        specifications: [
          "CPU: AMD Ryzen 7 PRO 5850U",
          "RAM: 16GB DDR4 (Soldered)",
          "Storage: 512GB SSD M.2 2280 PCIe",
          "Display: 14\" FHD (1920x1080) IPS 300nits",
          "OS: Windows 11 Pro"
        ].join('\n')
      },
      {
        productName: "ASUS ROG Strix G15 Gaming Laptop",
        sku: "AS-ROG-G15",
        brand: "ASUS",
        category: "Gaming Laptops",
        price: 1799.00,
        offerPrice: 1699.00,
        stockQuantity: 8,
        status: "active",
        featured: true,
        description: "High-performance gaming laptop equipped with Ryzen 9 processor and NVIDIA GeForce RTX 3060 graphics.",
        specifications: [
          "CPU: AMD Ryzen 9 5900HX",
          "RAM: 16GB DDR4 (8GB*2)",
          "Storage: 1TB PCIe M.2 SSD",
          "GPU: NVIDIA GeForce RTX 3060 6GB GDDR6",
          "Display: 15.6\" FHD 144Hz"
        ].join('\n')
      },
      {
        productName: "Dell Precision 3561 Mobile Workstation",
        sku: "DL-PREC-3561",
        brand: "Dell",
        category: "Workstations",
        price: 2199.00,
        offerPrice: 1999.00,
        stockQuantity: 5,
        status: "active",
        featured: false,
        description: "Extreme processing power for CAD design, software development, and demanding office workloads.",
        specifications: [
          "CPU: Intel Core i7-11850H",
          "RAM: 32GB DDR4",
          "Storage: 1TB NVMe Class 40 SSD",
          "GPU: NVIDIA T600 4GB GDDR6",
          "OS: Windows 11 Pro"
        ].join('\n')
      },
      {
        productName: "Hikvision DS-2CD2143G2-I Dome Camera",
        sku: "HK-DOME-001",
        brand: "Hikvision",
        category: "CCTV Cameras",
        price: 89.90,
        offerPrice: 79.90,
        stockQuantity: 42,
        status: "active",
        featured: false,
        description: "4MP AcuSense network dome camera with smart motion detection and night vision.",
        specifications: [
          "Resolution: 4MP",
          "Night Vision: 30m IR",
          "Lens: 2.8mm Fixed",
          "IP Rating: IP67",
          "Power: PoE"
        ].join('\n')
      },
      {
        productName: "Dahua IPC-HFW1431S Bullet Camera",
        sku: "DH-BLT-002",
        brand: "Dahua",
        category: "CCTV Cameras",
        price: 69.90,
        offerPrice: 59.90,
        stockQuantity: 30,
        status: "active",
        featured: false,
        description: "Outdoor bullet camera with AcuSense technology and excellent low-light performance.",
        specifications: [
          "Resolution: 4MP",
          "Night Vision: 60m",
          "IP Rating: IP67",
          "PoE Support",
          "H.265+ Compression"
        ].join('\n')
      },
      {
        productName: "Hikvision DS-7608NI NVR System",
        sku: "HK-NVR-006",
        brand: "Hikvision",
        category: "NVR Systems",
        price: 249.00,
        offerPrice: 229.00,
        stockQuantity: 15,
        status: "active",
        featured: false,
        description: "8-channel network video recorder supporting up to 8 IP cameras.",
        specifications: [
          "Channels: 8",
          "Storage: 2 SATA Slots",
          "Compression: H.265+",
          "HDMI Output",
          "Remote Viewing"
        ].join('\n')
      },
      {
        productName: "ZKTeco F18 Access Control Terminal",
        sku: "ZK-ACS-009",
        brand: "ZKTeco",
        category: "Access Control",
        price: 149.00,
        offerPrice: 139.00,
        stockQuantity: 15,
        status: "active",
        featured: false,
        description: "Fingerprint and RFID-based access control and employee time attendance terminal.",
        specifications: [
          "Fingerprint Capacity: 3000",
          "RFID Support",
          "TCP/IP and RS485 Interface",
          "Attendance Logs",
          "USB Backup Support"
        ].join('\n')
      }
    ];

    try {
      // 1. Create categories
      const categoriesToCreate = ["Laptops", "Gaming Laptops", "Business Laptops", "Workstations", "CCTV Cameras", "NVR Systems", "Access Control"];
      const currentCats = await categoryService.getCategories();
      for (const catName of categoriesToCreate) {
        if (!currentCats.find(c => c.name.toLowerCase() === catName.toLowerCase())) {
          await categoryService.createCategory({ name: catName, status: 'active' });
        }
      }

      // 2. Create brands
      const brandsToCreate = ["Dell", "HP", "Lenovo", "ASUS", "Hikvision", "Dahua", "ZKTeco"];
      const currentBrands = await brandService.getBrands();
      for (const bName of brandsToCreate) {
        if (!currentBrands.find(b => b.name.toLowerCase() === bName.toLowerCase())) {
          await brandService.createBrand({ name: bName, status: 'active', logo: '' });
        }
      }

      // 3. Create products
      const currentProds = await productService.getProducts();
      for (const p of productsToSeed) {
        if (!currentProds.find(prod => prod.sku === p.sku)) {
          await productService.createProduct(p);
        }
      }

      setSeedStatus('IT & Security database seeded successfully!');
      setTimeout(() => {
        setSeedStatus('');
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      setSeedStatus('Error seeding data: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, cats, brands, quotes] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
          brandService.getBrands(),
          quotationService.getQuotations()
        ]);

        const lowStockCount = prods.filter(p => p.stockQuantity <= 3 && p.stockQuantity > 0).length;

        setStats({
          products: prods.length,
          categories: cats.length,
          brands: brands.length,
          quotations: quotes.length,
          lowStock: lowStockCount
        });

        setRecentProducts(prods.slice(0, 5));
        setRecentQuotations(quotes.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard statistics', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      badge: 'Active & Inactive',
      badgeColor: 'text-blue-500'
    },
    {
      title: 'Total Categories',
      value: stats.categories,
      icon: Tags,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      badge: 'Product Groupings',
      badgeColor: 'text-emerald-500'
    },
    {
      title: 'Total Brands',
      value: stats.brands,
      icon: Award,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      badge: 'Security Partners',
      badgeColor: 'text-amber-500'
    },
    {
      title: 'Total Quotations',
      value: stats.quotations,
      icon: FileText,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      badge: 'Client Leads',
      badgeColor: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Seeding Control Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Seed Equipment Database</h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">Pre-populate standard Hikvision, Dahua, CP Plus & ZKTeco catalog lists</p>
        </div>
        <button
          onClick={seedProductsData}
          disabled={seeding}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          {seeding ? 'Seeding...' : 'Seed Catalog Data'}
        </button>
      </div>

      {seedStatus && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs p-3.5 rounded-lg font-bold">
          {seedStatus}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                    {card.title}
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800">
                    {card.value}
                  </span>
                </div>
                <div className={`p-3 rounded-lg border ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500">{card.badge}</span>
                <span className="flex items-center text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +12% this week
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Warnings / Alert Panel */}
      {stats.lowStock > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 border border-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm">Low Stock Alert</h4>
            <p className="text-xs text-amber-700">You have {stats.lowStock} product(s) running critically low on stock. Please review inventory counts.</p>
          </div>
          <Link to="/admin/products" className="ml-auto text-xs font-bold text-amber-900 underline hover:text-amber-700">
            Manage Inventory
          </Link>
        </div>
      )}

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recently Added Products</h3>
            <Link to="/admin/products" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase bg-slate-50/50">
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-400 text-xs">
                      No products found. Start by creating one!
                    </td>
                  </tr>
                ) : (
                  recentProducts.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <img 
                          src={p.image || 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200'} 
                          alt={p.productName} 
                          className="w-10 h-10 object-cover rounded border bg-slate-50"
                        />
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700 max-w-xs truncate">
                        {p.productName}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ${(p.offerPrice > 0 ? p.offerPrice : p.price).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          p.stockQuantity > 5 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : p.stockQuantity > 0 
                            ? 'bg-amber-50 text-amber-600' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {p.stockQuantity} Left
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Quotations</h3>
            <Link to="/admin/quotations" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase bg-slate-50/50">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-400 text-xs">
                      No quotations received yet.
                    </td>
                  </tr>
                ) : (
                  recentQuotations.map((q) => (
                    <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {q.customerName}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {q.company || 'Individual'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          q.status === 'new'
                            ? 'bg-blue-50 text-blue-600'
                            : q.status === 'contacted'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {q.status === 'new' && <Clock className="w-3 h-3 mr-1" />}
                          {q.status === 'contacted' && <TrendingUp className="w-3 h-3 mr-1" />}
                          {q.status === 'closed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          <span className="capitalize">{q.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
