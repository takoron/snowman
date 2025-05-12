document.addEventListener('DOMContentLoaded', () => {
  // Share Toku button click event
  const shareTokuBtn = document.getElementById('share-toku-btn');
  if (shareTokuBtn) {
    shareTokuBtn.addEventListener('click', () => {
      alert('あなたの徳積み体験の共有フォームは現在準備中です。もうしばらくお待ちください。');
    });
  }

  // Reaction buttons click event
  const reactionButtons = document.querySelectorAll('.toku-reaction-btn');
  if (reactionButtons) {
    reactionButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get the reaction type and parent card
        const reactionType = this.dataset.reaction;
        const tokuCard = this.closest('.toku-card');
        
        // Toggle active class on the button
        const isAlreadyActive = this.classList.contains('active');
        
        // Remove active class from all reaction buttons in the card
        const cardButtons = tokuCard.querySelectorAll('.toku-reaction-btn');
        cardButtons.forEach(btn => btn.classList.remove('active'));
        
        // If the button was not already active, add the active class
        if (!isAlreadyActive) {
          this.classList.add('active');
          
          // Show appropriate message based on the reaction
          let message = '';
          if (reactionType === 'like') {
            message = 'いいね！しました';
          } else if (reactionType === 'doubt') {
            message = 'ほんまか？と思いました';
          } else if (reactionType === 'fake') {
            message = 'うそやで！と思いました';
          }
          
          // Show reaction message (could be a toast notification)
          if (message) {
            // Create a temporary message element
            const messageElement = document.createElement('div');
            messageElement.className = 'reaction-message';
            messageElement.textContent = message;
            messageElement.style.position = 'fixed';
            messageElement.style.bottom = '20px';
            messageElement.style.left = '50%';
            messageElement.style.transform = 'translateX(-50%)';
            messageElement.style.backgroundColor = '#333';
            messageElement.style.color = 'white';
            messageElement.style.padding = '10px 20px';
            messageElement.style.borderRadius = '5px';
            messageElement.style.zIndex = '1000';
            
            // Append to body
            document.body.appendChild(messageElement);
            
            // Remove after 2 seconds
            setTimeout(() => {
              messageElement.remove();
            }, 2000);
          }
        }
      });
    });
  }
});