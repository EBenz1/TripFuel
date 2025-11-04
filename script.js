// script.js

// === 1. Global State & Data Management ===
const DATA_KEY = 'fuelTripTrackerData';

// ตารางแปลภาษา (Localization Data) - (รวมคำแปลทั้งหมด)
const translations = {
    'dashboard': { th: 'สรุป', en: 'Dashboard' },
    'record_trip': { th: 'บันทึกทริปใหม่', en: 'Record New Trip' },
    'trip_list': { th: 'รายการทริป', en: 'Trip List' },
    'cars': { th: 'จัดการรถยนต์', en: 'Car Management' },
    'settings': { th: 'การตั้งค่า', en: 'Settings' },
    'car_used': { th: 'รถที่ใช้', en: 'Car Used' },
    'select_car': { th: '-- เลือกรถที่ใช้ --', en: '-- Select Car --' },
    'add_car_warning': { th: '⚠️ กรุณาเพิ่มรถที่หน้า "รถ" ก่อน', en: '⚠️ Please add a car on the "Cars" page first' },
    'trip_name': { th: 'ชื่อทริป', en: 'Trip Name' },
    'trip_name_placeholder': { th: 'เช่น ทริปหัวหิน', en: 'e.g., Hua Hin Trip' },
    'date_time': { th: 'วัน/เวลา', en: 'Date/Time' },
    'total_km': { th: 'กิโลรวมทั้งทริป (กม.)', en: 'Total Distance (km)' },
    'fuel_start': { th: 'ลิตรน้ำมัน **ก่อน** ออก (ลิตร)', en: 'Fuel **Start** (Liters)' },
    'fuel_end': { th: 'ลิตรน้ำมัน **หลัง** จบ (ลิตร)', en: 'Fuel **End** (Liters)' },
    'fuel_price': { th: 'ราคาน้ำมันต่อลิตร (บาท)', en: 'Price per Liter (THB)' },
    'trip_hashtags': { th: 'เพิ่ม Hashtag (#)', en: 'Add Hashtag (#)' }, // New
    'hashtag_placeholder': { th: 'เช่น #เที่ยวเหนือ #ครอบครัว', en: 'e.g., #NorthernTrip #Family' }, // New
    'save_trip_btn': { th: 'บันทึกทริป', en: 'Save Trip' },
    'calc_summary': { th: 'กำลังคำนวณ...', en: 'Calculating...' },
    'no_trip_prompt': { th: 'โปรดบันทึกทริปแรกเพื่อดูข้อมูลสรุป', en: 'Please record your first trip to see the summary.' },
    'theme_setting': { th: 'โทนเว็บ', en: 'Web Theme' },
    'theme_light': { th: 'สว่าง', en: 'Light' },
    'theme_dark': { th: 'มืด', en: 'Dark' },
    'language_setting': { th: 'ภาษา', en: 'Language' },
    'clear_data': { th: 'ลบข้อมูลทั้งหมด', en: 'Clear All Data' },
    'clear_data_sub': { th: 'ล้างทริปและรถ', en: 'Clear trips and cars' },
    'clear_trips': { th: 'ลบทริปทั้งหมด', en: 'Clear All Trips' }, // New
    'clear_cars': { th: 'ลบรถยนต์ทั้งหมด', en: 'Clear All Cars' }, // New
    'app_version': { th: 'เวอร์ชั่น: 1.0.0-alpha', en: 'Version: 1.0.0-alpha' },
    'app_dev': { th: 'พัฒนาโดย: StarUp Dev Team (คู่หูเขียนโค้ด)', en: 'Developed by: StarUp Dev Team (Coding Partner)' },
    'error_fuel_end': { th: "ข้อผิดพลาด: 'ลิตรน้ำมันหลังจบ' ไม่ควรมากกว่า 'ลิตรน้ำมันก่อนออก'!", en: "Error: 'Fuel End' should not be greater than 'Fuel Start'!" },
    'save_success': { th: 'บันทึกทริป "${name}" เรียบร้อย!', en: 'Trip "${name}" saved successfully!' },
    'save_car_success': { th: 'บันทึกรถยนต์ "${name}" เรียบร้อย!', en: 'Car "${name}" saved successfully!' }, // New
    'warning_clear_data': { th: "คำเตือน! การดำเนินการนี้จะล้างข้อมูล ${type} ทั้งหมด คุณแน่ใจหรือไม่?", en: "Warning! This operation will clear all ${type} data. Are you sure?" }, // Updated
    'data_cleared': { th: "ข้อมูล ${type} ถูกล้างแล้ว! โปรดโหลดหน้าเว็บใหม่", en: "${type} data has been cleared! Please reload the page." }, // Updated
    'car_type': { th: 'รถยนต์', en: 'Car' }, // New
    'trip_type': { th: 'ทริป', en: 'Trip' }, // New
    'add_car': { th: 'เพิ่มรถยนต์ใหม่', en: 'Add New Car' },
    'car_name': { th: 'ชื่อรถ', en: 'Car Name' },
    'plate': { th: 'ทะเบียนรถ', en: 'License Plate' },
    'mileage': { th: 'เลขไมล์เริ่มต้น (กม.)', en: 'Starting Mileage (km)' },
    'save_btn': { th: 'บันทึกรถยนต์', en: 'Save Car' },
    'current_cars': { th: 'รายการรถยนต์ปัจจุบัน', en: 'Current Cars' },
    'no_cars': { th: 'ยังไม่มีรถยนต์ในระบบ', en: 'No cars in the system' },
    'delete_confirm': { th: 'คุณแน่ใจหรือไม่ว่าต้องการลบรถคันนี้?', en: 'Are you sure you want to delete this car?' },
    'car_delete_success': { th: 'ลบรถเรียบร้อย!', en: 'Car deleted successfully!' },
    'view_detail': { th: 'ดูรายละเอียด', en: 'View Detail' },
    'trip_detail': { th: 'รายละเอียดทริป', en: 'Trip Detail' },
    'distance': { th: 'ระยะทาง', en: 'Distance' },
    'fuel_used': { th: 'น้ำมันใช้ไป', en: 'Fuel Used' },
    'fuel_eff': { th: 'อัตราสิ้นเปลือง', en: 'Fuel Efficiency' },
    'cost': { th: 'ค่าใช้จ่าย', en: 'Cost' },
    'export_btn': { th: 'บันทึกเป็น JPG', en: 'Export to JPG' },
    'edit_btn': { th: 'แก้ไขทริป', en: 'Edit Trip' },
    'delete_trip_btn': { th: 'ลบทริป', en: 'Delete Trip' },
    'delete_trip_confirm': { th: 'คุณแน่ใจหรือไม่ว่าต้องการลบทริปนี้?', en: 'Are you sure you want to delete this trip?' },
    'trip_deleted': { th: 'ลบทริปเรียบร้อย!', en: 'Trip deleted successfully!' },
    'no_trip_detail': { th: 'ไม่พบข้อมูลทริป', en: 'Trip data not found' },
    'km_unit': { th: 'กม.', en: 'km' },
    'liter_unit': { th: 'ลิตร', en: 'Liters' },
    'kml_unit': { th: 'กม./ลิตร', en: 'km/Liter' },
    'baht_unit': { th: 'บาท', en: 'Baht' },
    'confirm': { th: 'ยืนยัน', en: 'Confirm' },
    'cancel': { th: 'ยกเลิก', en: 'Cancel' },
};

function getTranslation(key) {
    const appData = getAppData();
    const lang = appData.settings.language || 'th';
    return translations[key]?.[lang] || key;
}

function getAppData() {
    const defaultData = {
        trips: [],
        cars: [{ id: 'car-1', name: 'รถเก๋ง', plate: 'กท 1234', mileage: 15000, imageURL: null }], 
        settings: { theme: 'light', language: 'th' } 
    };
    const data = localStorage.getItem(DATA_KEY);
    return data ? JSON.parse(data) : defaultData;
}

function saveAppData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

/**
 * คำนวณสรุปข้อมูลรวมจากทุกทริป
 * @returns {object|null} สรุปข้อมูลรวมหรือ null ถ้าไม่มีทริป
 */
function calculateSummary() {
    const { trips } = getAppData();
    
    if (trips.length === 0) {
        return null;
    }

    let totalDistance = 0;
    let totalFuelUsed = 0;
    let totalCost = 0;

    trips.forEach(trip => {
        // ต้องแน่ใจว่าค่าเป็นตัวเลขก่อนคำนวณ
        const fuelUsed = parseFloat(trip.fuelStartLiters) - parseFloat(trip.fuelEndLiters);
        const cost = fuelUsed * parseFloat(trip.fuelPricePerLiter);
        
        totalDistance += parseFloat(trip.totalKm);
        totalFuelUsed += fuelUsed;
        totalCost += cost;
    });

    const overallKmPerLiter = totalFuelUsed > 0 ? totalDistance / totalFuelUsed : 0;

    return {
        totalDistance: totalDistance.toFixed(1),
        totalFuelUsed: totalFuelUsed.toFixed(2),
        totalCost: totalCost.toFixed(2),
        overallKmPerLiter: overallKmPerLiter.toFixed(2)
    };
}


// ฟังก์ชัน: เพิ่ม/แก้ไขทริป
function addTrip(newTrip) {
    const appData = getAppData();
    
    // แปลงค่าให้เป็น Float สำหรับการจัดเก็บ
    const tripData = {
        ...newTrip,
        totalKm: parseFloat(newTrip.totalKm),
        fuelStartLiters: parseFloat(newTrip.fuelStartLiters),
        fuelEndLiters: parseFloat(newTrip.fuelEndLiters),
        fuelPricePerLiter: parseFloat(newTrip.fuelPricePerLiter),
        dateTime: new Date(newTrip.dateTime).toLocaleString(),
    };

    if (newTrip.id && appData.trips.some(t => t.id === newTrip.id)) {
        appData.trips = appData.trips.map(t => t.id === newTrip.id ? tripData : t);
    } else {
        tripData.id = 'trip-' + Date.now();
        appData.trips.push(tripData);
    }
    
    saveAppData(appData);
}

// ฟังก์ชัน: ลบทริป
function deleteTrip(tripId) {
    const appData = getAppData();
    appData.trips = appData.trips.filter(trip => trip.id !== tripId);
    saveAppData(appData);
}

// ฟังก์ชัน: เพิ่มรถใหม่
function addCar(newCar) {
    const appData = getAppData();
    newCar.id = 'car-' + Date.now();
    newCar.mileage = parseFloat(newCar.mileage);
    // เพิ่ม: imageURL (Base64 String)
    newCar.imageURL = newCar.imageURL || null;
    appData.cars.push(newCar);
    saveAppData(appData);
}

// ฟังก์ชัน: ลบรถ
function deleteCar(carId) {
    const appData = getAppData();
    appData.cars = appData.cars.filter(car => car.id !== carId);
    saveAppData(appData);
}

// ฟังก์ชัน: ล้างข้อมูลทั้งหมด (ปรับปรุงใหม่)
function clearAllData(dataType) {
    const typeKey = dataType === 'trips' ? 'trip_type' : 'car_type';
    const typeName = getTranslation(typeKey);

    const warningMessage = getTranslation('warning_clear_data').replace('${type}', typeName);

    // ใช้ Sweet Alert แทน confirm()
    Swal.fire({
        title: 'ยืนยันการลบข้อมูล',
        text: warningMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: getTranslation('confirm'),
        cancelButtonText: getTranslation('cancel')
    }).then((result) => {
        if (result.isConfirmed) {
            const appData = getAppData();
            if (dataType === 'trips') {
                appData.trips = [];
            } else if (dataType === 'cars') {
                appData.cars = [];
            }
            saveAppData(appData);

            Swal.fire({
                title: 'สำเร็จ!',
                text: getTranslation('data_cleared').replace('${type}', typeName),
                icon: 'success',
                confirmButtonColor: 'var(--color-primary)'
            }).then(() => {
                window.location.reload();
            });
        }
    });
}

// === 1.1 Pop-up Management (New Feature) ===
/**
 * แสดง Pop-up แจ้งเตือนกลางจอ (แทน alert/confirm ธรรมดา)
 * ต้องเรียกใช้ library เช่น SweetAlert2 ใน index.html
 */
function showPopup(title, text, icon, callback = null) {
    if (typeof Swal === 'undefined') {
        // Fallback to native alert if SweetAlert2 is not loaded
        alert(`${title}: ${text}`);
        if (callback) callback();
        return;
    }
    
    Swal.fire({
        title: title,
        text: text,
        icon: icon, // 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: getTranslation('confirm'),
        confirmButtonColor: 'var(--color-primary)'
    }).then((result) => {
        if (result.isConfirmed && callback) {
            callback();
        }
    });
}


// === 2. Theme & Language Management ===
const rootElement = document.documentElement;

function applyTheme(theme) {
    if (theme === 'dark') {
        rootElement.classList.add('dark-mode');
    } else {
        rootElement.classList.remove('dark-mode');
    }
}

function toggleTheme() {
    const appData = getAppData();
    const newTheme = appData.settings.theme === 'light' ? 'dark' : 'light';
    
    appData.settings.theme = newTheme;
    saveAppData(appData);
    applyTheme(newTheme);
    renderCurrentPage();
}

function setLanguage(lang) {
    const appData = getAppData();
    appData.settings.language = lang;
    saveAppData(appData);
    
    const selectBox = document.getElementById('language-select');
    if (selectBox) {
        selectBox.value = lang;
    }
    
    renderCurrentPage(); 
    updateNavbarText();
}

function updateNavbarText() {
    const navItems = {
        'dashboard': getTranslation('dashboard'),
        'record': getTranslation('record_trip').split(' ')[0],
        'trips': getTranslation('trip_list').split(' ')[0],
        'cars': getTranslation('cars').split(' ')[0],
        'settings': getTranslation('settings').split(' ')[0]
    };
    
    for (const page in navItems) {
        const span = document.querySelector(`[data-page="${page}"] span`);
        if (span) {
            span.textContent = navItems[page];
        }
    }
}

// === 3. Routing and Page Rendering ===
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('#bottom-navbar .nav-item');

function navigate(page) {
    const [mainPage, id] = page.split(':');

    navItems.forEach(item => {
        if (item.getAttribute('data-page') === mainPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    switch(mainPage) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'record':
            renderRecordTrip(id);
            break;
        case 'trips':
            if (id) {
                renderTripDetail(id);
            } else {
                renderTripList();
            }
            break;
        case 'cars':
            renderCarManagement();
            break;
        case 'settings':
            renderSettings();
            break;
        default:
            renderDashboard();
    }
}

function renderCurrentPage() {
    const hash = window.location.hash.substring(1);
    const page = hash || 'dashboard';
    navigate(page);
}


// === 4. Page Rendering Functions ===

// 4.1 Dashboard (แสดงผลสรุปรวม)
function renderDashboard() {
    const summary = calculateSummary();

    if (!summary) {
        mainContent.innerHTML = `
            <h1>📊 ${getTranslation('dashboard')}</h1>
            <div class="card" style="text-align: center; padding: 30px;">
                <i class="fas fa-car-side" style="font-size: 40px; color: var(--color-primary); margin-bottom: 15px;"></i>
                <p style="font-size: 16px; font-weight: 500;">${getTranslation('no_trip_prompt')}</p>
                <button class="btn-primary" onclick="window.location.hash='#record'" style="margin-top: 15px; width: auto; padding: 10px 20px;">
                    <i class="fas fa-plus-circle"></i> ${getTranslation('record_trip')}
                </button>
            </div>
        `;
        return;
    }
    
    // ข้อมูลสำหรับแสดงผลใน Stat Card
    const stats = [
        { 
            label: getTranslation('distance') + 'รวม', 
            value: summary.totalDistance, 
            unit: getTranslation('km_unit'), 
            icon: 'fas fa-globe', 
            color: 'var(--color-primary)' 
        },
        { 
            label: getTranslation('fuel_eff') + 'เฉลี่ย', 
            value: summary.overallKmPerLiter, 
            unit: getTranslation('kml_unit'), 
            icon: 'fas fa-tachometer-alt', 
            color: '#3b82f6' 
        },
        { 
            label: getTranslation('fuel_used') + 'รวม', 
            value: summary.totalFuelUsed, 
            unit: getTranslation('liter_unit'), 
            icon: 'fas fa-oil-can', 
            color: '#f59e0b' 
        },
        { 
            label: getTranslation('cost') + 'รวม', 
            value: summary.totalCost, 
            unit: getTranslation('baht_unit'), 
            icon: 'fas fa-wallet', 
            color: '#059669',
            isHighlight: true // ไฮไลท์ค่าใช้จ่ายรวม
        },
    ];

    mainContent.innerHTML = `
        <h1>📊 ${getTranslation('dashboard')}</h1>
        <p style="font-size: 14px; color: var(--color-text-sub); margin-bottom: 20px;">สรุปข้อมูลการใช้เชื้อเพลิงจากทุกทริป</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${stats.map(stat => `
                <div class="stat-card" style="
                    padding: 15px; 
                    border-radius: 8px; 
                    background-color: ${stat.isHighlight ? 'var(--color-primary-light)' : 'var(--color-bg-body-hover)'}; 
                    border: 1px solid ${stat.isHighlight ? 'var(--color-primary)' : 'var(--color-border)'};
                ">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: 12px; color: ${stat.isHighlight ? 'var(--color-text)' : 'var(--color-text-sub)'};">${stat.label}</span>
                        <i class="${stat.icon}" style="color: ${stat.color}; font-size: 16px;"></i>
                    </div>
                    <p style="font-size: 22px; font-weight: 700; margin-top: 5px; color: ${stat.isHighlight ? 'var(--color-text)' : 'var(--color-text)'};">
                        ${stat.value} <span style="font-size: 14px; font-weight: 500; color: var(--color-text-sub);">${stat.unit}</span>
                    </p>
                </div>
            `).join('')}
        </div>
        
        <p style="text-align: center; margin-top: 30px; color: var(--color-text-sub); font-size: 12px;">ดูรายละเอียดทริปทั้งหมดได้ที่หน้า รายการทริป</p>
    `;
}

// 4.2 Record Trip (Updated with Hashtag input)
function renderRecordTrip(tripId = null) {
    const { cars, trips } = getAppData();
    let currentTrip = {
        tripName: '',
        dateTime: new Date().toISOString().substring(0, 16),
        totalKm: 0,
        fuelStartLiters: 0,
        fuelEndLiters: 0,
        fuelPricePerLiter: 0,
        carId: '',
        hashtags: '', // New property for hashtags
    };
    let isEditing = false;
    
    if (tripId) {
        currentTrip = trips.find(t => t.id === tripId) || currentTrip;
        const dateObj = new Date(currentTrip.dateTime);
        const isoString = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString().substring(0, 16);
        currentTrip.dateTime = isoString;
        isEditing = true;
    }

    mainContent.innerHTML = `
        <h1>📝 ${isEditing ? 'แก้ไข' : getTranslation('record_trip')}</h1>
        <form id="record-trip-form" class="card" style="padding: 20px;">
            ${isEditing ? `<input type="hidden" name="tripId" value="${tripId}">` : ''}
            
            <div class="form-group" style="margin-bottom: 15px;">
                <label for="carId">${getTranslation('car_used')}</label>
                <select name="carId" id="carId" required>
                    <option value="">${getTranslation('select_car')}</option>
                    ${cars.map(car => `<option value="${car.id}" ${currentTrip.carId === car.id ? 'selected' : ''}>${car.name} (${car.plate})</option>`).join('')}
                </select>
                ${cars.length === 0 ? `<p style="color: #ef4444; font-size: 12px; margin-top: 5px;">${getTranslation('add_car_warning')}</p>` : ''}
            </div>

            <div class="form-group" style="margin-bottom: 15px;">
                <label for="tripName">${getTranslation('trip_name')}</label>
                <input type="text" name="tripName" id="tripName" placeholder="${getTranslation('trip_name_placeholder')}" value="${currentTrip.tripName}" required>
            </div>

            <div class="form-group" style="margin-bottom: 15px;">
                <label for="dateTime">${getTranslation('date_time')}</label>
                <input type="datetime-local" name="dateTime" id="dateTime" value="${currentTrip.dateTime}" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 15px;">
                <label for="totalKm">${getTranslation('total_km')}</label>
                <input type="number" name="totalKm" id="totalKm" min="0" step="0.1" value="${currentTrip.totalKm}" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div class="form-group">
                    <label for="fuelStartLiters">${getTranslation('fuel_start')}</label>
                    <input type="number" name="fuelStartLiters" id="fuelStartLiters" min="0" step="0.01" value="${currentTrip.fuelStartLiters}" required>
                </div>
                <div class="form-group">
                    <label for="fuelEndLiters">${getTranslation('fuel_end')}</label>
                    <input type="number" name="fuelEndLiters" id="fuelEndLiters" min="0" step="0.01" value="${currentTrip.fuelEndLiters}" required>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 15px;">
                <label for="fuelPricePerLiter">${getTranslation('fuel_price')}</label>
                <input type="number" name="fuelPricePerLiter" id="fuelPricePerLiter" min="0" step="0.01" value="${currentTrip.fuelPricePerLiter}" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 25px;">
                <label for="hashtags">${getTranslation('trip_hashtags')}</label>
                <input type="text" name="hashtags" id="hashtags" placeholder="${getTranslation('hashtag_placeholder')}" value="${currentTrip.hashtags || ''}">
            </div>

            <button type="submit" class="btn-primary" ${cars.length === 0 ? 'disabled' : ''}>${isEditing ? 'บันทึกการแก้ไข' : getTranslation('save_trip_btn')}</button>
        </form>
    `;

    const form = document.getElementById('record-trip-form');
    if (form) {
        form.addEventListener('submit', handleRecordTripSubmit);
    }
}

// ฟังก์ชัน: จัดการการ Submit ฟอร์มบันทึก/แก้ไขทริป (Updated to use showPopup)
function handleRecordTripSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    const formData = {
        id: form.tripId?.value || null,
        carId: form.carId.value,
        tripName: form.tripName.value,
        dateTime: form.dateTime.value,
        totalKm: form.totalKm.value,
        fuelStartLiters: form.fuelStartLiters.value,
        fuelEndLiters: form.fuelEndLiters.value,
        fuelPricePerLiter: form.fuelPricePerLiter.value,
        hashtags: form.hashtags.value.trim(), // Get new hashtag value
    };

    if (parseFloat(formData.fuelEndLiters) > parseFloat(formData.fuelStartLiters)) {
        showPopup('ข้อผิดพลาด', getTranslation('error_fuel_end'), 'error');
        return;
    }

    addTrip(formData);
    
    // Use Pop-up instead of native alert
    showPopup('สำเร็จ', getTranslation('save_success').replace('${name}', formData.tripName), 'success', () => {
        form.reset();
        window.location.hash = '#trips'; 
    });
}

// 4.3 Trip List
function renderTripList() {
    const { trips, cars } = getAppData();
    
    const getCarName = (carId) => {
        const car = cars.find(c => c.id === carId);
        return car ? `${car.name} (${car.plate})` : 'ไม่พบรถ';
    };

    mainContent.innerHTML = `
        <h1>📋 ${getTranslation('trip_list')}</h1>
        <div id="trip-list-container" style="margin-top: 20px;">
            ${trips.length === 0 ? 
                `<p style="text-align: center; color: var(--color-text-sub); padding: 20px;">ยังไม่มีการบันทึกทริป</p>` :
                trips.slice().reverse().map(trip => { 
                    const fuelUsed = trip.fuelStartLiters - trip.fuelEndLiters;
                    const kmPerLiter = trip.totalKm / fuelUsed;
                    
                    // Display Hashtags
                    const hashtagsHtml = trip.hashtags ? 
                        `<p style="font-size: 12px; color: var(--color-text-sub); margin-top: 5px;">${trip.hashtags.split(/\s+/).map(tag => `<span style="color: var(--color-primary); margin-right: 5px;">${tag}</span>`).join('')}</p>` : 
                        '';

                    return `
                        <div class="card trip-item" data-trip-id="${trip.id}" style="margin-bottom: 10px; padding: 15px; cursor: pointer;" onclick="window.location.hash = '#trips:${trip.id}'">
                            <p style="font-weight: 700; color: var(--color-primary); margin-bottom: 5px;">${trip.tripName}</p>
                            <p style="font-size: 12px; color: var(--color-text-sub);">รถ: ${getCarName(trip.carId)} | เมื่อ: ${trip.dateTime}</p>
                            ${hashtagsHtml}
                            <hr style="border-top: 1px dashed var(--color-border); margin: 8px 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px;">
                                <span>${getTranslation('distance')}: <b>${trip.totalKm.toFixed(1)} ${getTranslation('km_unit')}</b></span>
                                <span style="color: #10b981; font-weight: 700;">${getTranslation('view_detail')} &raquo;</span>
                            </div>
                        </div>
                    `;
                }).join('')
            }
        </div>
    `;
}

// 4.4 Trip Detail (Updated to display Hashtags)
function renderTripDetail(tripId) {
    const { trips, cars } = getAppData();
    const trip = trips.find(t => t.id === tripId);

    if (!trip) {
        mainContent.innerHTML = `<h1>⚠️ ${getTranslation('no_trip_detail')}</h1>`;
        return;
    }

    const getCarName = (carId) => {
        const car = cars.find(c => c.id === carId);
        return car ? `${car.name} (${car.plate})` : 'ไม่พบรถ';
    };
    
    const getCarImageURL = (carId) => {
        const car = cars.find(c => c.id === carId);
        return car?.imageURL || null;
    };
    
    const carImageURL = getCarImageURL(trip.carId);

    const fuelUsed = trip.fuelStartLiters - trip.fuelEndLiters;
    const cost = fuelUsed * trip.fuelPricePerLiter;
    const kmPerLiter = fuelUsed > 0 ? trip.totalKm / fuelUsed : 0;
    
    // Display Hashtags
    const hashtagsHtml = trip.hashtags ? 
        `<p style="font-size: 12px; color: var(--color-text-sub); margin-bottom: 15px;">${trip.hashtags.split(/\s+/).map(tag => `<span style="color: var(--color-primary); margin-right: 5px;">${tag}</span>`).join('')}</p>` : 
        '';

    // ข้อมูลสำหรับแสดงผลใน Stat Card
    const stats = [
        { 
            label: getTranslation('distance'), 
            value: trip.totalKm.toFixed(1), 
            unit: getTranslation('km_unit'), 
            icon: 'fas fa-route', 
            color: 'var(--color-primary)',
            isHighlight: false
        },
        { 
            label: getTranslation('fuel_eff'), 
            value: kmPerLiter.toFixed(2), 
            unit: getTranslation('kml_unit'), 
            icon: 'fas fa-gas-pump', 
            color: '#3b82f6',
            isHighlight: false
        },
        { 
            label: getTranslation('fuel_used'), 
            value: fuelUsed.toFixed(2), 
            unit: getTranslation('liter_unit'), 
            icon: 'fas fa-oil-can', 
            color: '#f59e0b',
            isHighlight: false
        },
        { 
            label: getTranslation('cost'), 
            value: cost.toFixed(2), 
            unit: getTranslation('baht_unit'), 
            icon: 'fas fa-wallet', 
            color: '#059669',
            isHighlight: true 
        },
    ];


    mainContent.innerHTML = `
        <h1 style="margin-bottom: 10px;"><i class="fas fa-info-circle" style="color: var(--color-primary); margin-right: 10px;"></i> ${getTranslation('trip_detail')}</h1>
        <p style="font-size: 14px; color: var(--color-text-sub); margin-bottom: 20px;">${trip.tripName} (${getCarName(trip.carId)})</p>

        <div id="trip-detail-export-area" class="card" style="
            padding: 20px; 
            border: 1px solid var(--color-border); 
            background-color: var(--color-bg-card);
            position: relative; 
        ">
            
            ${carImageURL ? `
                <img src="${carImageURL}" alt="${getCarName(trip.carId)}" style="
                    position: absolute; 
                    top: 40px;          
                    right: 15px;        
                    width: 120px;       
                    height: 75px;       
                    object-fit: cover;  
                    border-radius: 8px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
                    z-index: 10;        
                ">
            ` : ''}

            <p style="font-size: 20px; font-weight: 700; color: var(--color-primary); margin-bottom: 5px; ${carImageURL ? 'padding-right: 140px;' : ''}">
                ${trip.tripName}
            </p>
            <p style="font-size: 12px; color: var(--color-text-sub); margin-bottom: 15px;">
                <i class="fas fa-calendar-alt" style="margin-right: 5px;"></i> ${trip.dateTime}
            </p>
            
            ${hashtagsHtml}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${stats.map(stat => `
                    <div class="stat-card" style="
                        padding: 10px; 
                        border-radius: 8px; 
                        background-color: ${stat.isHighlight ? 'var(--color-primary-light)' : 'var(--color-bg-body-hover)'}; 
                        border: 1px solid ${stat.isHighlight ? 'var(--color-primary)' : 'var(--color-border)'};
                    ">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="font-size: 12px; color: ${stat.isHighlight ? 'var(--color-text)' : 'var(--color-text-sub)'};">${stat.label}</span>
                            <i class="${stat.icon}" style="color: ${stat.color}; font-size: 14px;"></i>
                        </div>
                        <p style="font-size: 18px; font-weight: 700; margin-top: 5px; color: ${stat.isHighlight ? 'var(--color-text)' : 'var(--color-text)'};">
                            ${stat.value} <span style="font-size: 12px; font-weight: 500; color: ${stat.isHighlight ? 'var(--color-text)' : 'var(--color-text-sub)'};">${stat.unit}</span>
                        </p>
                    </div>
                `).join('')}
            </div>
            
            <p style="text-align: right; margin-top: 15px; font-size: 10px; color: var(--color-text-sub);">#FuelTripTracker</p>
        </div>
        <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <button id="export-btn" class="btn-primary" style="
                background-color: var(--color-soft-yellow); 
                border-color: var(--color-soft-yellow-border);
            ">
                <i class="fas fa-camera"></i> ${getTranslation('export_btn')}
            </button>
            
            <button id="edit-btn" class="btn-primary" style="
                background-color: var(--color-soft-blue); 
                border-color: var(--color-soft-blue-border);
            ">
                <i class="fas fa-edit"></i> ${getTranslation('edit_btn')}
            </button>
        </div>
        
        <button id="delete-btn" class="btn-primary" style="
            background-color: var(--color-soft-red); 
            border-color: var(--color-soft-red-border);
            margin-top: 15px;
        ">
            <i class="fas fa-trash-alt"></i> ${getTranslation('delete_trip_btn')}
        </button>
    `;
    
    // **Event Listeners ที่สำคัญเพื่อให้ปุ่มทำงาน**
    document.getElementById('edit-btn')?.addEventListener('click', () => {
        window.location.hash = `#record:${tripId}`;
    });
    
    document.getElementById('delete-btn')?.addEventListener('click', () => {
        // Use Pop-up for confirmation
        Swal.fire({
            title: 'ยืนยันการลบ',
            text: getTranslation('delete_trip_confirm'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: getTranslation('confirm'),
            cancelButtonText: getTranslation('cancel')
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTrip(tripId);
                showPopup('สำเร็จ', getTranslation('trip_deleted'), 'success', () => {
                    window.location.hash = '#trips';
                });
            }
        });
    });

    document.getElementById('export-btn')?.addEventListener('click', () => {
        handleExportToJPG(tripId);
    });
}

// ฟังก์ชัน: Export Detail เป็น JPG/PNG (แก้ไขปัญหาขอบขาว)
function handleExportToJPG(tripId) {
    const element = document.getElementById('trip-detail-export-area');
    const tripName = getAppData().trips.find(t => t.id === tripId)?.tripName || 'Trip_Detail';

    if (typeof html2canvas === 'undefined') {
        showPopup('ข้อผิดพลาด', "ไลบรารี html2canvas ไม่ถูกโหลด โปรดตรวจสอบไฟล์ index.html", 'error');
        return;
    }

    html2canvas(element, { 
        allowTaint: true, 
        useCORS: true, 
        scale: 2,
        backgroundColor: null, // แก้ปัญหาขอบขาว: ทำให้พื้นหลังโปร่งใส
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
    }).then(canvas => {
        const imageURL = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `${tripName.replace(/\s/g, '_')}_FuelTrip.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Helper function: แปลง File เป็น Base64 String
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// 4.5 Car Management (Updated to use showPopup for delete)
function renderCarManagement() {
    const { cars } = getAppData();
    const t = (key) => translations[key]?.[getAppData().settings.language] || key;

    mainContent.innerHTML = `
        <h1>🚗 ${getTranslation('cars')}</h1>

        <div class="card" style="padding: 20px; margin-bottom: 20px;">
            <h2 style="font-size: 18px; font-weight: 700; color: var(--color-primary); margin-bottom: 15px;">${t('add_car')}</h2>
            <form id="add-car-form">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label for="carName">${t('car_name')}</label>
                    <input type="text" name="carName" id="carName" required>
                </div>
                <div class="form-group" style="margin-bottom: 15px;">
                    <label for="carPlate">${t('plate')}</label>
                    <input type="text" name="carPlate" id="carPlate" required>
                </div>
                <div class="form-group" style="margin-bottom: 15px;">
                    <label for="carMileage">${t('mileage')}</label>
                    <input type="number" name="carMileage" id="carMileage" min="0" step="0.1" required value="0">
                </div>
                <div class="form-group" style="margin-bottom: 25px;">
                    <label for="carImageFile">รูปรถยนต์ (อัปโหลดจากเครื่อง)</label>
                    <input type="file" name="carImageFile" id="carImageFile" accept="image/*">
                </div>
                
                <button type="submit" class="btn-primary">${t('save_btn')}</button>
            </form>
        </div>

        <h2 style="font-size: 18px; font-weight: 700; color: var(--color-text); margin-bottom: 15px;">${t('current_cars')}</h2>
        <div id="car-list-container">
            ${cars.length === 0 ? 
                `<p style="text-align: center; color: var(--color-text-sub); padding: 20px;">${t('no_cars')}</p>` :
                cars.map(car => `
                    <div class="card car-item" data-car-id="${car.id}" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 15px;">
                        <div>
                            <p style="font-weight: 700; color: var(--color-text);">${car.name} (${car.plate})</p>
                            <p style="font-size: 12px; color: var(--color-text-sub);">เลขไมล์เริ่มต้น: ${car.mileage.toLocaleString()} กม.</p>
                            ${car.imageURL ? `<p style="font-size: 10px; color: var(--color-primary);">มีรูปภาพ</p>` : ''}
                        </div>
                        <button class="btn-delete-car" data-id="${car.id}" style="background: none; border: none; color: #ef4444; cursor: pointer;">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `).join('')
            }
        </div>
    `;

    document.getElementById('add-car-form')?.addEventListener('submit', handleAddCarSubmit);

    document.querySelectorAll('.btn-delete-car').forEach(button => {
        button.addEventListener('click', handleDeleteCarClick);
    });
}

// ฟังก์ชันสำหรับจัดการการ Submit ฟอร์มเพิ่มรถยนต์ (Updated to use showPopup)
async function handleAddCarSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    const imageFile = form.carImageFile.files[0];
    
    // แปลงรูปภาพเป็น Base64 String
    const base64Image = await fileToBase64(imageFile);

    const newCar = {
        name: form.carName.value,
        plate: form.carPlate.value,
        mileage: form.carMileage.value,
        // ** บันทึก Base64 String แทน URL **
        imageURL: base64Image, 
    };

    addCar(newCar);
    
    showPopup('สำเร็จ', getTranslation('save_car_success').replace('${name}', newCar.name), 'success', () => {
        form.reset();
        renderCarManagement(); 
    });
}

// ฟังก์ชันสำหรับจัดการการลบรถยนต์ (Updated to use showPopup)
function handleDeleteCarClick(event) {
    const carId = event.currentTarget.getAttribute('data-id');
    const t = (key) => translations[key]?.[getAppData().settings.language] || key;
    
    // Use Pop-up for confirmation
    Swal.fire({
        title: 'ยืนยันการลบ',
        text: t('delete_confirm'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel')
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCar(carId);
            showPopup('สำเร็จ', t('car_delete_success'), 'success', renderCarManagement);
        }
    });
}


// 4.6 Settings (Updated Clear Data section)
function renderSettings() {
    const appData = getAppData();
    const theme = appData.settings.theme;
    const lang = appData.settings.language;

    mainContent.innerHTML = `
        <h1><i class="fas fa-cog" style="color: var(--color-primary); margin-right: 10px;"></i> ${getTranslation('settings')}</h1>
        
        <div class="card" style="padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--color-border);">
                <span style="font-weight: 500;"><i class="fas fa-globe" style="color: var(--color-primary); margin-right: 10px;"></i> ${getTranslation('language_setting')}</span>
                <select id="language-select" style="padding: 5px 10px; border-radius: 6px; border: 1px solid var(--color-border); background-color: var(--color-bg-card); color: var(--color-text);">
                    <option value="th" ${lang === 'th' ? 'selected' : ''}>ภาษาไทย</option>
                    <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                </select>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--color-border);">
                <span style="font-weight: 500;"><i class="fas fa-moon" style="color: var(--color-primary); margin-right: 10px;"></i> ${getTranslation('theme_setting')} (${theme === 'light' ? getTranslation('theme_light') : getTranslation('theme_dark')})</span>
                <button id="theme-toggle-btn" style="background: none; border: none; cursor: pointer; color: var(--color-text);">
                    <i class="fas fa-toggle-${theme === 'dark' ? 'on' : 'off'}" style="font-size: 24px; color: ${theme === 'dark' ? 'var(--color-primary)' : 'var(--color-text-sub)'};"></i>
                </button>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; color: #ef4444; cursor: pointer; border-bottom: 1px solid var(--color-border);" id="clear-trips-btn">
                <span style="font-weight: 500;"><i class="fas fa-route" style="color: #ef4444; margin-right: 10px;"></i> ${getTranslation('clear_trips')}</span>
                <span style="font-size: 12px; color: var(--color-text-sub);">ลบข้อมูลทริปทั้งหมด</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; color: #ef4444; cursor: pointer;" id="clear-cars-btn">
                <span style="font-weight: 500;"><i class="fas fa-car" style="color: #ef4444; margin-right: 10px;"></i> ${getTranslation('clear_cars')}</span>
                <span style="font-size: 12px; color: var(--color-text-sub);">ลบข้อมูลรถยนต์ทั้งหมด</span>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; font-size: 14px; color: var(--color-text-sub);">
            <p style="font-weight: 700; color: var(--color-text);">Fuel Trip Tracker</p>
            <p>${getTranslation('app_version')}</p>
            <p>${getTranslation('app_dev')}</p>
        </div>
    `;

    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
    
    // New Event Listeners for selective clear
    document.getElementById('clear-trips-btn')?.addEventListener('click', () => clearAllData('trips'));
    document.getElementById('clear-cars-btn')?.addEventListener('click', () => clearAllData('cars'));
    
    document.getElementById('language-select')?.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}


// === 5. Initialization ===
window.addEventListener('hashchange', renderCurrentPage);

document.addEventListener('DOMContentLoaded', () => {
    const appData = getAppData();
    applyTheme(appData.settings.theme);
    updateNavbarText(); 
    renderCurrentPage();
});

function showPopup(title, text, icon, callback = null) {
    if (typeof Swal === 'undefined') {
        // Fallback...
        alert(`${title}: ${text}`);
        if (callback) callback();
        return;
    }
    
    Swal.fire({
        title: title,
        text: text,
        icon: icon, // 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: getTranslation('confirm'),
        confirmButtonColor: 'var(--color-primary)' // ใช้สีหลักของแอป
    }).then((result) => {
        if (result.isConfirmed && callback) {
            callback();
        }
    });
}