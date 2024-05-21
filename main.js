// Lưu trữ thông tin sản phẩm và giao dịch mua hàng
let products = [];
let sales = [];

// Xử lý sự kiện khi nhấn vào nút "Thêm sản phẩm"
document.querySelector('.btn:nth-child(5) button').addEventListener('click', addProduct);

// Xử lý sự kiện khi nhấn vào nút "Mua hàng"
document.querySelector('.btn:nth-child(6) button').addEventListener('click', buyProduct);

// Xử lý sự kiện khi nhấn vào nút "Danh sách khách hàng"
document.querySelector('.btn:nth-child(4) button').addEventListener('click', showCustomerList);

// Xử lý sự kiện khi nhấn vào nút "Doanh thu"
document.querySelector('.btn:nth-child(1) button').addEventListener('click', showTotalRevenue);

// Xử lý sự kiện khi nhấn vào nút "Lợi nhuận"
document.querySelector('.btn:nth-child(2) button').addEventListener('click', showTotalProfit);

// Xử lý sự kiện khi nhấn vào nút "Hàng còn tại cửa hàng"
document.querySelector('.btn:nth-child(3) button').addEventListener('click', showInventoryList);

// Hàm thêm sản phẩm
function addProduct() {
  let productId = document.getElementById('product-id').value;
  let name = document.getElementById('name').value;
  let price1 = parseFloat(document.getElementById('price1').value);
  let quantity = parseInt(document.getElementById('add-quantity').value);
  let addDate = new Date(document.getElementById('add-date').value);

  products.push({
    id: productId,
    name: name,
    price: price1,
    quantity: quantity,
    addDate: addDate
  });

  // Xóa các giá trị trong form
  clearForm();

  // Hiển thị thông báo thêm sản phẩm thành công
  console.log(`Đã thêm sản phẩm ${name} với số lượng ${quantity} vào danh sách.`);
}

// Hàm mua hàng
function buyProduct() {
  let productId = document.getElementById('product-id').value;
  let price2 = parseFloat(document.getElementById('price2').value);
  let quantity = parseInt(document.getElementById('buy-quantity').value);
  let customer = document.getElementById('customer').value;
  let buyTime = new Date(document.getElementById('buy-time').value);

  // Tìm sản phẩm trong danh sách sản phẩm
  let product = products.find(p => p.id === productId);
  if (product) {
    // Kiểm tra số lượng sản phẩm còn trong kho
    if (product.quantity >= quantity) {
      // Cập nhật số lượng sản phẩm còn lại
      product.quantity -= quantity;

      // Lưu thông tin giao dịch mua hàng
      sales.push({
        productId: productId,
        price: price2,
        quantity: quantity,
        customer: customer,
        buyTime: buyTime
      });

      // Xóa các giá trị trong form
      clearForm();

      // Hiển thị thông báo mua hàng thành công
      console.log(`Đã bán ${quantity} sản phẩm cho khách hàng ${customer}.`);
    } else {
      alert('Số lượng sản phẩm không đủ!');
    }
  } else {
    alert('Không tìm thấy sản phẩm!');
  }
}

// Hàm hiển thị danh sách khách hàng
function showCustomerList() {
  let customerList = sales.reduce((list, sale) => {
    if (!list.includes(sale.customer)) {
      list.push(sale.customer);
    }
    return list;
  }, []);

  console.log('Danh sách khách hàng:');
  console.log(customerList);
}

// Hàm hiển thị tổng doanh thu
function showTotalRevenue() {
  let totalRevenue = sales.reduce((total, sale) => {
    return total + (sale.price * sale.quantity);
  }, 0);

  console.log('Tổng doanh thu: ' + totalRevenue);
}

// Hàm hiển thị tổng lợi nhuận
function showTotalProfit() {
  let totalCost = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  let totalRevenue = sales.reduce((total, sale) => {
    return total + (sale.price * sale.quantity);
  }, 0);

  let totalProfit = totalRevenue - totalCost;

  console.log('Tổng lợi nhuận: ' + totalProfit);
}

// Hàm hiển thị danh sách hàng còn tại cửa hàng
function showInventoryList() {
  let inventoryList = products.map(product => {
    let soldQuantity = sales.filter(sale => sale.productId === product.id)
                          .reduce((total, sale) => total + sale.quantity, 0);
    let remainingQuantity = product.quantity - soldQuantity;
    return {
      id: product.id,
      quantity: remainingQuantity
    };
  });

  console.log('Danh sách hàng còn tại cửa hàng:');
  console.log(inventoryList);
}

// Hàm xóa các giá trị trong form
function clearForm() {
  document.getElementById('product-id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('price1').value = '';
  document.getElementById('add-quantity').value = '';
  document.getElementById('add-date').value = '';
  document.getElementById('price2').value = '';
  document.getElementById('buy-quantity').value = '';
  document.getElementById('customer').value = '';
  document.getElementById('buy-time').value = '';
}
