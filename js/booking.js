/**
 * RentIt – Multi-Category Online Rental Marketplace
 * Booking, Payment, Reviews & Owner Dashboard Operations
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- INVENTORY MANAGEMENT (ADD PRODUCT PAGE) ---
  const addProductForm = document.getElementById("add-product-form");
  if (addProductForm) {
    const imgInput = document.getElementById("prod-image-file");
    const imgPreviewContainer = document.getElementById("image-preview-container");
    let base64Image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"; // Default nice headphones fallback

    // Image upload preview for product
    if (imgInput && imgPreviewContainer) {
      imgInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            imgPreviewContainer.innerHTML = `<img src="${event.target.result}" class="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" style="max-height: 250px;" alt="Preview">`;
            base64Image = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("prod-title").value.trim();
      const category = document.getElementById("prod-category").value;
      const description = document.getElementById("prod-desc").value.trim();
      const location = document.getElementById("prod-location").value.trim();
      const price = parseFloat(document.getElementById("prod-price").value);
      const securityDeposit = parseFloat(document.getElementById("prod-deposit").value);

      if (!title || !category || !description || !location || isNaN(price) || isNaN(securityDeposit)) {
        showToast("Please fill in all details correctly.", "error");
        return;
      }

      showLoadingScreen();

      setTimeout(() => {
        const products = getProducts();
        
        // Formulate a dynamic key
        let categoryKey = "equipment";
        if (category.includes("Camera")) categoryKey = "camera";
        else if (category.includes("Car") || category.includes("Bike")) categoryKey = "vehicle";
        else if (category.includes("House") || category.includes("Apartment")) categoryKey = "house";
        else if (category.includes("Electronics")) categoryKey = "electronics";
        else if (category.includes("Furniture")) categoryKey = "furniture";
        else if (category.includes("Drone")) categoryKey = "drone";
        else if (category.includes("Music")) categoryKey = "music";
        else if (category.includes("Camping")) categoryKey = "camp";

        const newProduct = {
          id: "prod-" + (products.length + 1),
          title: title,
          category: category,
          categoryKey: categoryKey,
          image: base64Image,
          price: price,
          rating: 5.0,
          reviewsCount: 0,
          location: location,
          availability: "Available",
          securityDeposit: securityDeposit,
          owner: getCurrentUser(),
          description: description,
          specifications: [
            { key: "Condition", value: "Excellent" },
            { key: "Location", value: location },
            { key: "Verified Owner", value: "Yes" }
          ],
          reviews: []
        };

        products.push(newProduct);
        saveProducts(products);

        hideLoadingScreen();
        showToast("Product listed for rent successfully!", "success");

        setTimeout(() => {
          window.location.href = "owner-dashboard.html";
        }, 800);
      }, 1000);
    });
  }

  // --- REVIEW SYSTEM ---
  const reviewForm = document.getElementById("write-review-form");
  if (reviewForm) {
    const stars = document.querySelectorAll(".rating-stars-input i");
    let currentRating = 5;

    stars.forEach(star => {
      star.addEventListener("click", () => {
        currentRating = parseInt(star.getAttribute("data-value"));
        stars.forEach(s => {
          const val = parseInt(s.getAttribute("data-value"));
          if (val <= currentRating) {
            s.className = "fa-solid fa-star text-amber fs-4 cursor-pointer";
          } else {
            s.className = "fa-regular fa-star text-secondary fs-4 cursor-pointer";
          }
        });
      });
    });

    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const reviewText = document.getElementById("review-text").value.trim();
      const productId = new URLSearchParams(window.location.search).get("id") || "prod-1";

      if (!reviewText) {
        showToast("Please write some feedback text", "error");
        return;
      }

      showLoadingScreen();
      setTimeout(() => {
        const products = getProducts();
        const pIndex = products.findIndex(p => p.id === productId);

        if (pIndex !== -1) {
          const user = getCurrentUser();
          const newRev = {
            author: user.name,
            rating: currentRating,
            date: new Date().toISOString().split("T")[0],
            text: reviewText,
            avatar: user.avatar
          };

          products[pIndex].reviews.push(newRev);
          
          // Recompute average rating and count
          const totalRating = products[pIndex].reviews.reduce((sum, r) => sum + r.rating, 0);
          products[pIndex].reviewsCount = products[pIndex].reviews.length;
          products[pIndex].rating = parseFloat((totalRating / products[pIndex].reviews.length).toFixed(2));

          saveProducts(products);
          hideLoadingScreen();
          showToast("Review submitted successfully!", "success");

          setTimeout(() => {
            window.location.href = `product.html?id=${productId}`;
          }, 800);
        } else {
          hideLoadingScreen();
          showToast("Product not found to attach review", "error");
        }
      }, 800);
    });
  }

  // --- BOOKING CALCULATION LOGIC ---
  const bookingPage = document.getElementById("booking-page-container");
  if (bookingPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id") || "prod-1";
    const product = getProductById(productId);

    if (!product) {
      showToast("Selected item is not valid or was removed.", "error");
      setTimeout(() => { window.location.href = "home.html"; }, 1500);
      return;
    }

    // Populate UI with product card summary
    document.getElementById("book-item-image").src = product.image;
    document.getElementById("book-item-title").textContent = product.title;
    document.getElementById("book-item-location").textContent = product.location;
    document.getElementById("book-item-rating").textContent = product.rating;
    document.getElementById("book-item-reviews").textContent = `(${product.reviewsCount} reviews)`;
    document.getElementById("book-item-price").textContent = `₹${product.price}`;

    const startDateInput = document.getElementById("booking-start-date");
    const endDateInput = document.getElementById("booking-end-date");
    const qtyInput = document.getElementById("booking-qty");
    const couponInput = document.getElementById("booking-coupon");
    const couponBtn = document.getElementById("apply-coupon-btn");

    // Default dates (Today & tomorrow)
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2); // 2 days default

    startDateInput.value = today.toISOString().split("T")[0];
    endDateInput.value = tomorrow.toISOString().split("T")[0];

    // Set min date of start date to today
    startDateInput.min = today.toISOString().split("T")[0];

    startDateInput.addEventListener("change", () => {
      endDateInput.min = startDateInput.value;
      if (new Date(endDateInput.value) < new Date(startDateInput.value)) {
        endDateInput.value = startDateInput.value;
      }
      recomputeTotals();
    });

    endDateInput.addEventListener("change", recomputeTotals);
    qtyInput.addEventListener("input", recomputeTotals);

    // Coupon verification
    let activeDiscountPercent = 0;
    let couponCodeApplied = "NONE";

    couponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      if (!code) {
        showToast("Please enter a coupon code", "error");
        return;
      }

      if (code === "WELCOME10") {
        activeDiscountPercent = 10;
        couponCodeApplied = "WELCOME10";
        showToast("Coupon Applied! 10% Discount received", "success");
      } else if (code === "RENTIT20") {
        activeDiscountPercent = 20;
        couponCodeApplied = "RENTIT20";
        showToast("Coupon Applied! Special 20% Discount received", "success");
      } else {
        showToast("Invalid Coupon Code", "error");
        activeDiscountPercent = 0;
        couponCodeApplied = "NONE";
      }
      recomputeTotals();
    });

    let currentTotals = {};

    function recomputeTotals() {
      const start = new Date(startDateInput.value);
      const end = new Date(endDateInput.value);
      const qty = parseInt(qtyInput.value) || 1;

      // Ensure positive qty
      if (qty < 1) qtyInput.value = 1;

      // Compute day count
      const diffTime = Math.abs(end - start);
      let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (days === 0) days = 1; // minimum 1 day lease

      const dailyPrice = product.price;
      const securityDeposit = product.securityDeposit * qty;
      const subtotal = dailyPrice * days * qty;
      const discount = parseFloat(((subtotal * activeDiscountPercent) / 100).toFixed(2));
      const taxes = parseFloat(((subtotal - discount) * 0.10).toFixed(2)); // 10% Tax
      const grandTotal = parseFloat((subtotal - discount + taxes + securityDeposit).toFixed(2));

      // Update elements
      document.getElementById("calc-days").textContent = `${days} day${days > 1 ? "s" : ""}`;
      document.getElementById("calc-daily-price").textContent = `₹${dailyPrice}`;
      document.getElementById("calc-subtotal").textContent = `₹${subtotal.toFixed(2)}`;
      document.getElementById("calc-deposit").textContent = `₹${securityDeposit.toFixed(2)}`;
      document.getElementById("calc-taxes").textContent = `₹${taxes.toFixed(2)}`;
      
      const discountContainer = document.getElementById("calc-discount-row");
      const discountVal = document.getElementById("calc-discount");
      if (discount > 0) {
        discountVal.textContent = `-₹${discount.toFixed(2)}`;
        discountContainer.classList.remove("d-none");
      } else {
        discountContainer.classList.add("d-none");
      }

      document.getElementById("calc-total").textContent = `₹${grandTotal.toFixed(2)}`;

      // Save totals structure for passing to payment
      currentTotals = {
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        days: days,
        pricePerDay: dailyPrice,
        quantity: qty,
        couponCode: couponCodeApplied,
        securityDeposit: securityDeposit,
        subtotal: subtotal,
        discount: discount,
        taxes: taxes,
        total: grandTotal,
        ownerName: product.owner.name
      };
    }

    // Trigger initial calculation
    recomputeTotals();

    // Proceed to Payment Action
    const proceedBtn = document.getElementById("proceed-to-payment-btn");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        // Cache the pending totals in localStorage
        localStorage.setItem("rentit_pending_booking", JSON.stringify(currentTotals));
        window.location.href = "payment.html";
      });
    }
  }

  // --- PAYMENT PAGE MANAGEMENT ---
  const paymentPage = document.getElementById("payment-page-container");
  if (paymentPage) {
    const pendingBooking = JSON.parse(localStorage.getItem("rentit_pending_booking"));
    if (!pendingBooking) {
      showToast("No pending booking found", "error");
      setTimeout(() => { window.location.href = "home.html"; }, 1000);
      return;
    }

    // Populate order summary
    document.getElementById("pay-item-image").src = pendingBooking.productImage;
    document.getElementById("pay-item-title").textContent = pendingBooking.productTitle;
    document.getElementById("pay-summary-dates").textContent = `${pendingBooking.startDate} to ${pendingBooking.endDate}`;
    document.getElementById("pay-summary-days-qty").textContent = `${pendingBooking.days} day${pendingBooking.days > 1 ? "s" : ""} × ${pendingBooking.quantity} Unit`;
    document.getElementById("pay-summary-subtotal").textContent = `₹${pendingBooking.subtotal.toFixed(2)}`;
    document.getElementById("pay-summary-deposit").textContent = `₹${pendingBooking.securityDeposit.toFixed(2)}`;
    document.getElementById("pay-summary-taxes").textContent = `₹${pendingBooking.taxes.toFixed(2)}`;
    
    if (pendingBooking.discount > 0) {
      document.getElementById("pay-summary-discount").textContent = `-₹${pendingBooking.discount.toFixed(2)}`;
      document.getElementById("pay-summary-discount-row").classList.remove("d-none");
    } else {
      document.getElementById("pay-summary-discount-row").classList.add("d-none");
    }

    document.getElementById("pay-summary-total").textContent = `₹${pendingBooking.total.toFixed(2)}`;

    // Payment Type Selection Interaction
    const paymentMethods = document.querySelectorAll(".payment-method-card");
    let selectedMethod = "Credit Card";

    paymentMethods.forEach(card => {
      card.addEventListener("click", () => {
        paymentMethods.forEach(c => c.classList.remove("border-primary", "bg-light-blue"));
        card.classList.add("border-primary", "bg-light-blue");
        selectedMethod = card.getAttribute("data-method");

        // Toggle details
        const ccFields = document.getElementById("credit-card-fields");
        const upiFields = document.getElementById("upi-fields");
        const netFields = document.getElementById("netbanking-fields");

        if (selectedMethod === "Credit Card" || selectedMethod === "Debit Card") {
          ccFields?.classList.remove("d-none");
          upiFields?.classList.add("d-none");
          netFields?.classList.add("d-none");
        } else if (selectedMethod === "UPI") {
          ccFields?.classList.add("d-none");
          upiFields?.classList.remove("d-none");
          netFields?.classList.add("d-none");
        } else {
          ccFields?.classList.add("d-none");
          upiFields?.classList.add("d-none");
          netFields?.classList.remove("d-none");
        }
      });
    });

    // Confirm Payment Submit Action
    const confirmPaymentBtn = document.getElementById("confirm-payment-btn");
    if (confirmPaymentBtn) {
      confirmPaymentBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Simple validation checks on selected inputs
        if (selectedMethod === "Credit Card" || selectedMethod === "Debit Card") {
          const ccNum = document.getElementById("cc-number")?.value;
          const ccExp = document.getElementById("cc-exp")?.value;
          const ccCvv = document.getElementById("cc-cvv")?.value;
          if (!ccNum || !ccExp || !ccCvv) {
            showToast("Please enter card details.", "error");
            return;
          }
        } else if (selectedMethod === "UPI") {
          const upiId = document.getElementById("upi-id")?.value;
          if (!upiId) {
            showToast("Please enter your UPI ID.", "error");
            return;
          }
        }

        showLoadingScreen();

        setTimeout(() => {
          // Commit booking to final list
          const bookings = getBookings();
          const bookingId = "BK-" + Math.floor(100000 + Math.random() * 900000);
          
          const completedBooking = {
            ...pendingBooking,
            id: bookingId,
            status: "Confirmed",
            qrCode: `${bookingId}-${pendingBooking.productId.toUpperCase()}-CONFIRMED-RENTIT`
          };

          bookings.unshift(completedBooking); // add to top of stack
          saveBookings(bookings);

          // Remove pending
          localStorage.removeItem("rentit_pending_booking");

          // Save last confirmed booking ID so confirmation.html can fetch it
          localStorage.setItem("rentit_last_confirmed_id", bookingId);

          hideLoadingScreen();
          showToast("Payment Successful!", "success");

          setTimeout(() => {
            window.location.href = "confirmation.html";
          }, 800);
        }, 1500);
      });
    }
  }

  // --- BOOKING CONFIRMATION DISPLAY ---
  const confirmationPage = document.getElementById("confirmation-page-container");
  if (confirmationPage) {
    const lastId = localStorage.getItem("rentit_last_confirmed_id");
    const bookings = getBookings();
    const currentBk = bookings.find(b => b.id === lastId) || bookings[0]; // fallback to last booking if refresh

    if (currentBk) {
      document.getElementById("conf-id").textContent = currentBk.id;
      document.getElementById("conf-title").textContent = currentBk.productTitle;
      document.getElementById("conf-dates").textContent = `${currentBk.startDate} to ${currentBk.endDate} (${currentBk.days} Days)`;
      document.getElementById("conf-total").textContent = `₹${currentBk.total.toFixed(2)}`;
      
      // Setup simple visual QR
      const qrVal = document.getElementById("conf-qr-value");
      if (qrVal) {
        qrVal.textContent = currentBk.qrCode;
      }
    }

    // Receipt download mock
    const downloadBtn = document.getElementById("download-receipt-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        showToast("Receipt saved to Downloads folder!", "success");
      });
    }
  }
});
