document.addEventListener('DOMContentLoaded', () => {
  // Share shrine button click event
  const shareShrinebtn = document.getElementById('share-shrine-btn');
  if (shareShrinebtn) {
    shareShrinebtn.addEventListener('click', () => {
      alert('神社参拝体験の共有フォームは現在準備中です。もうしばらくお待ちください。');
    });
  }
  
  // Shrine finder form submit event
  const shrineFinderForm = document.getElementById('shrine-finder-form');
  if (shrineFinderForm) {
    shrineFinderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const birthMonth = document.getElementById('birth-month').value;
      const personalityType = document.getElementById('personality-type').value;
      const wishStrength = document.getElementById('wish-strength').value;
      const oshiMember = document.getElementById('oshi-member').value;
      
      // Generate shrine recommendation
      generateShrineRecommendation(birthMonth, personalityType, wishStrength, oshiMember);
    });
  }
});

// Generate shrine recommendation based on user input
function generateShrineRecommendation(birthMonth, personalityType, wishStrength, oshiMember) {
  // Define shrine recommendations based on input combinations
  const shrines = [
    {
      name: '明治神宮',
      description: '都心にありながら広大な森に囲まれた神社。特に芸能関係の願いが叶うと言われています。',
      prayerTips: '雪をイメージしながら静かに願いを込めると効果的です。',
      bestDay: '毎月9日（Snow Manの9人にちなんで）',
      matchCriteria: {
        months: [1, 3, 5, 7, 9, 11],
        personalities: ['active', 'creative'],
        wishStrength: [4, 5],
        members: ['sakuma', 'raul', 'mukai']
      }
    },
    {
      name: '伏見稲荷大社',
      description: '千本鳥居が有名で、強い願いを持って参拝すると叶うと言われています。',
      prayerTips: '鳥居の数だけ願いが増幅すると言われているので、ゆっくりと歩いて通り抜けましょう。',
      bestDay: '毎月1日と15日',
      matchCriteria: {
        months: [2, 6, 10],
        personalities: ['calm', 'logical'],
        wishStrength: [3, 4, 5],
        members: ['iwamoto', 'tatsuya', 'shouta']
      }
    },
    {
      name: '箱根神社',
      description: '芦ノ湖のほとりにある神社で、パワースポットとしても人気。',
      prayerTips: '湖の水を見ながら深呼吸をしてから参拝すると良いでしょう。',
      bestDay: '毎月16日',
      matchCriteria: {
        months: [4, 8, 12],
        personalities: ['active', 'calm'],
        wishStrength: [1, 2, 3],
        members: ['hikaru', 'koji', 'ryohei']
      }
    },
    {
      name: '日枝神社',
      description: '山王さまとして親しまれ、特に「勝負運」に強い神社と言われています。',
      prayerTips: '神社内の階段を一段一段丁寧に上りながら、気持ちを高めていくと良いでしょう。',
      bestDay: '毎月5日と25日',
      matchCriteria: {
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        personalities: ['logical', 'creative'],
        wishStrength: [4, 5],
        members: ['daisuke', 'koji', 'iwamoto']
      }
    },
    {
      name: '北海道神宮',
      description: '広大な敷地を持ち、特に北国の守り神として有名。',
      prayerTips: '雪が降る時期の参拝がおすすめです。Snow Manの名前にちなんでいます。',
      bestDay: '毎月2日と27日',
      matchCriteria: {
        months: [1, 2, 11, 12],
        personalities: ['calm', 'logical'],
        wishStrength: [1, 2, 3, 4, 5],
        members: ['shouta', 'ryohei', 'tatsuya']
      }
    },
    {
      name: '湯島天神',
      description: '学問の神様として有名ですが、芸能関係の願いも叶うと言われています。',
      prayerTips: '境内の梅の木を見つめてから参拝すると、願いが叶いやすくなると言われています。',
      bestDay: '毎月25日',
      matchCriteria: {
        months: [3, 5, 7, 9],
        personalities: ['active', 'creative'],
        wishStrength: [2, 3, 4],
        members: ['raul', 'mukai', 'daisuke']
      }
    }
  ];
  
  // Find matching shrines based on criteria
  let matchingShrine = null;
  let highestMatchScore = -1;
  
  shrines.forEach(shrine => {
    let matchScore = 0;
    
    // Check month match
    if (shrine.matchCriteria.months.includes(parseInt(birthMonth))) {
      matchScore += 2;
    }
    
    // Check personality match
    if (shrine.matchCriteria.personalities.includes(personalityType)) {
      matchScore += 2;
    }
    
    // Check wish strength match
    if (shrine.matchCriteria.wishStrength.includes(parseInt(wishStrength))) {
      matchScore += 1;
    }
    
    // Check oshi member match
    if (oshiMember && shrine.matchCriteria.members.includes(oshiMember)) {
      matchScore += 3;
    }
    
    // Update best match if current shrine has higher score
    if (matchScore > highestMatchScore) {
      highestMatchScore = matchScore;
      matchingShrine = shrine;
    }
  });
  
  // Default shrine if no match is found
  if (!matchingShrine) {
    matchingShrine = shrines[0];
  }
  
  // Display result
  displayShrineResult(matchingShrine, birthMonth);
}

// Display shrine recommendation result
function displayShrineResult(shrine, birthMonth) {
  const resultElement = document.getElementById('shrine-result');
  if (!resultElement) return;
  
  const monthName = getMonthName(birthMonth);
  let luckLevel = Math.floor(Math.random() * 3) + 3; // Random luck level between 3-5
  
  // Create stars HTML based on luck level
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= luckLevel) {
      starsHTML += '<span class="result-star filled"><i class="fa-solid fa-star"></i></span>';
    } else {
      starsHTML += '<span class="result-star"><i class="fa-regular fa-star"></i></span>';
    }
  }
  
  resultElement.innerHTML = `
    <h3>あなたにおすすめの神社</h3>
    <div class="result-shrine">
      <div class="result-shrine-name">${shrine.name}</div>
      <div class="result-luck-level">
        <span>チケット運アップ期待度: </span>
        ${starsHTML}
      </div>
      <p class="result-description">${shrine.description}</p>
      <div class="result-tips">
        <p><strong>参拝のポイント:</strong> ${shrine.prayerTips}</p>
        <p><strong>おすすめ参拝日:</strong> ${shrine.bestDay}</p>
      </div>
      <div class="result-month-message">
        <p>${monthName}生まれのあなたは、この神社との相性が特に良いようです。一度参拝して、チケット当選を祈願してみましょう！</p>
      </div>
    </div>
  `;
  
  // Scroll to result
  resultElement.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to get month name in Japanese
function getMonthName(monthNumber) {
  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  return months[parseInt(monthNumber) - 1] || '不明な月';
}