// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Load ticket tips
  loadTips();
  
  // Initialize venue seating info
  initializeVenueInfo();
  
  // Load past concerts data
  loadPastConcerts();
  
  // Add event listeners
  setupEventListeners();
  
  // Initialize realtime tips functionality
  setupRealtimeTips();
});

// Load tips data to the page
function loadTips(filter = 'all') {
  const tipsContainer = document.querySelector('.tips-container');
  tipsContainer.innerHTML = ''; // Clear existing content
  
  // Sort tips by priority (high > medium > low) and date (newest first)
  const sortedTips = [...tipsData].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    // First sort by priority
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    // If same priority, sort by date (newest first)
    if (priorityDiff === 0) {
      return new Date(b.date) - new Date(a.date);
    }
    return priorityDiff;
  });
  
  sortedTips.forEach(tip => {
    // Apply filter
    if (filter !== 'all' && tip.priority !== filter) return;
    
    const tipCard = document.createElement('div');
    tipCard.className = 'tip-card';
    
    // Add special highlighting for tips from X
    if (tip.fromX) {
      tipCard.classList.add('from-x');
    }
    
    tipCard.innerHTML = `
      <span class="priority priority-${tip.priority}">${getPriorityText(tip.priority)}</span>
      ${tip.fromX ? '<span class="x-badge"><i class="fa-brands fa-x-twitter"></i> 新着</span>' : ''}
      <h3>${tip.title}</h3>
      <p>${tip.content}</p>
      <p class="source">出典: ${tip.source}</p>
      <p class="date">投稿日: ${tip.date}</p>
    `;
    
    tipsContainer.appendChild(tipCard);
  });
}

// Helper to convert priority to Japanese text
function getPriorityText(priority) {
  switch(priority) {
    case 'high': return '優先度高';
    case 'medium': return '優先度中';
    case 'low': return '優先度低';
    default: return '優先度不明';
  }
}

// Initialize venue seating information
function initializeVenueInfo() {
  const venueSelect = document.getElementById('venue-select');
  updateVenueInfo(venueSelect.value);
}

// Update venue information based on selection
function updateVenueInfo(venueId) {
  const venue = venueData[venueId];
  
  if (!venue) return;
  
  // Update seating map
  const seatingMap = document.getElementById('seating-map');
  seatingMap.innerHTML = `<div class="venue-placeholder">${venue.name}の座席マップ</div>`;
  
  // Update best spots
  const bestSpots = document.getElementById('best-spots');
  bestSpots.innerHTML = '';
  venue.bestSpots.forEach(spot => {
    const listItem = document.createElement('li');
    listItem.textContent = spot;
    bestSpots.appendChild(listItem);
  });
  
  // Update stage notes
  document.getElementById('stage-notes').textContent = venue.stageNotes;
}

// Load past concerts data
function loadPastConcerts() {
  const pastConcertsContainer = document.querySelector('.past-concerts-container');
  
  pastConcertsData.forEach(concert => {
    const concertCard = document.createElement('div');
    concertCard.className = 'concert-card';
    
    concertCard.innerHTML = `
      <div class="concert-img-placeholder" data-alt="${concert.title}">
        ${concert.venue} - ${concert.date}
      </div>
      <div class="concert-card-content">
        <h3>${concert.title}</h3>
        <p><strong>日付:</strong> ${concert.date}</p>
        <p><strong>会場:</strong> ${concert.venue}</p>
        <p>${concert.description}</p>
        <a href="#" class="view-details" data-id="${concert.id}">詳細を見る</a>
      </div>
    `;
    
    pastConcertsContainer.appendChild(concertCard);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons for tips
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Apply filter
      loadTips(button.dataset.filter);
    });
  });
  
  // Venue selector
  const venueSelect = document.getElementById('venue-select');
  venueSelect.addEventListener('change', () => {
    updateVenueInfo(venueSelect.value);
  });
  
  // Past concert details (modal would be implemented here in a real app)
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const concertId = button.dataset.id;
      alert(`コンサート #${concertId} の詳細情報ページは現在準備中です。`);
    });
  });
}

// Setup realtime tips functionality
function setupRealtimeTips() {
  const shareForm = document.getElementById('share-form');
  const previewBtn = document.getElementById('preview-btn');
  const previewContainer = document.getElementById('preview-container');
  const tipPreview = document.getElementById('tip-preview');
  const closePreviewBtn = document.getElementById('close-preview-btn');
  const xFetchBtn = document.getElementById('x-fetch-btn');
  
  // X/Twitter fetch button functionality
  if (xFetchBtn) {
    xFetchBtn.addEventListener('click', fetchTipsFromX);
  }
  
  if (shareForm) {
    // Preview button functionality
    previewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get form data for preview
      const title = document.getElementById('tip-title').value;
      const priority = document.getElementById('priority').value;
      const source = document.getElementById('source').value || '情報源なし';
      const content = document.getElementById('content').value;
      
      // Validate required fields
      if (!title || !priority || !content) {
        alert('タイトル、優先度、内容は必須項目です。');
        return;
      }
      
      // Create preview
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      tipPreview.innerHTML = `
        <span class="priority priority-${priority}">${getPriorityText(priority)}</span>
        <h3>${title}</h3>
        <p>${content}</p>
        <p class="source">出典: ${source}</p>
        <p class="date">投稿日: ${today}</p>
      `;
      
      // Show preview
      previewContainer.style.display = 'block';
    });
    
    // Close preview button
    if (closePreviewBtn) {
      closePreviewBtn.addEventListener('click', () => {
        previewContainer.style.display = 'none';
      });
    }
    
    // Form submission to add new tips
    shareForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const tipType = document.getElementById('tip-type').value;
      const title = document.getElementById('tip-title').value;
      const priority = document.getElementById('priority').value;
      const source = document.getElementById('source').value || '情報源なし';
      const content = document.getElementById('content').value;
      const username = document.getElementById('username').value || '匿名';
      
      // Validate required fields
      if (!title || !priority || !content) {
        alert('タイトル、優先度、内容は必須項目です。');
        return;
      }
      
      // Only proceed if the tip type is "ticket"
      if (tipType === 'ticket') {
        // Create new tip data
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const newTipId = tipsData.length > 0 ? Math.max(...tipsData.map(tip => tip.id)) + 1 : 1;
        
        const newTip = {
          id: newTipId,
          title: title,
          content: content,
          source: source + (username !== '匿名' ? ` (提供: ${username})` : ''),
          priority: priority,
          date: today
        };
        
        // Add to tips data
        tipsData.push(newTip);
        
        // Reload tips with current filter
        const activeFilter = document.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        loadTips(filter);
        
        // Scroll to tips section
        document.getElementById('tips').scrollIntoView({ behavior: 'smooth' });
        
        // Show success message
        alert('チケット獲得のコツを追加しました！');
      } else {
        // For other tip types, just show a generic message
        alert(`「${tipType === 'venue' ? '会場・座席情報' : '過去の体験談'}」を共有していただき、ありがとうございます！\n情報は審査後に掲載されます。`);
      }
      
      // Reset form
      shareForm.reset();
      
      // Hide preview if visible
      previewContainer.style.display = 'none';
    });
  }
}

// Mock X/Twitter API fetch function
function fetchTipsFromX() {
  // Show loading state
  const xFetchBtn = document.getElementById('x-fetch-btn');
  const originalContent = xFetchBtn.innerHTML;
  
  xFetchBtn.innerHTML = '<span class="loading-spinner"></span>Xから情報取得中...';
  xFetchBtn.disabled = true;
  
  // Simulate API call with a delay
  setTimeout(() => {
    // Restore button state
    xFetchBtn.innerHTML = originalContent;
    xFetchBtn.disabled = false;
    
    // Mock data - simulating tips from Twitter/X
    const mockXTips = [
      {
        title: "先行予約時の抽選対策",
        content: "Snow Manの先行予約抽選では、申し込みを早くするほど当選率が上がるわけではありません。抽選期間内であれば時間に関係なく平等なチャンスがあります。焦らず、情報をしっかりと読んでから申し込みましょう。",
        source: "Twitter/X: @snowman_ticket_info",
        priority: "high",
        date: new Date().toISOString().split('T')[0]
      },
      {
        title: "チケット販売サイトのサーバー対策",
        content: "一般販売開始直後はサーバーが混雑します。モバイルデータ通信と光回線など、異なるネットワークを準備しておくと、一方が繋がりにくい場合でも対応できます。",
        source: "Twitter/X: @concert_tech_tips",
        priority: "medium",
        date: new Date().toISOString().split('T')[0]
      },
      {
        title: "最新公演！チケット情報が更新されました",
        content: "Snow Man 2024年秋公演の情報が公式サイトで公開されました。FC会員は7月15日から先行抽選予約が開始されます。早めにファンクラブ更新手続きを済ませておきましょう。",
        source: "Twitter/X: @snowman_official",
        priority: "high",
        date: new Date().toISOString().split('T')[0]
      }
    ];
    
    // Add these tips to our data
    let newTipsCount = 0;
    mockXTips.forEach(tip => {
      // Generate a new ID for the tip
      const newTipId = tipsData.length > 0 ? Math.max(...tipsData.map(tip => tip.id)) + 1 + newTipsCount : 1 + newTipsCount;
      
      // Create the new tip object
      const newTip = {
        id: newTipId,
        title: tip.title,
        content: tip.content,
        source: tip.source,
        priority: tip.priority,
        date: tip.date,
        fromX: true // Mark this tip as coming from X
      };
      
      // Add to our data
      tipsData.push(newTip);
      newTipsCount++;
    });
    
    // Update the display
    const activeFilter = document.querySelector('.filter-btn.active');
    const filter = activeFilter ? activeFilter.dataset.filter : 'all';
    loadTips(filter);
    
    // Show success message
    alert(`Xから${newTipsCount}件の新しいチケット獲得情報を取得しました！`);
    
    // Scroll to tips section
    document.getElementById('tips').scrollIntoView({ behavior: 'smooth' });
  }, 2000); // Simulate a 2 second delay for API response
}