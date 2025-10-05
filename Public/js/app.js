document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.show-details-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const details = document.getElementById(`details-${id}`);
  
        if (!details.dataset.loaded) {
          try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            details.innerHTML = `
              <div class="alert alert-info mb-0">
                <div><strong>Daily rate:</strong> $${Number(data.daily_rate).toFixed(2)}/day</div>
                <div><strong>Available:</strong> ${data.available} unit(s)</div>
              </div>`;
            details.dataset.loaded = 'true';
          } catch {
            details.innerHTML = `<div class="alert alert-danger mb-0">Couldn’t load details.</div>`;
          }
        }
        details.classList.toggle('show');
        btn.textContent = details.classList.contains('show')
          ? 'Hide price & availability'
          : 'Show price & availability';
      });
    });
  });
  // CONTACT FORM HANDLER
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
  
    form.addEventListener('submit', (e) => {
      // If any required input is empty, the browser will block submit and this won't run.
      // For testing without filling fields, add form.setAttribute('novalidate','') or fill the fields.
      e.preventDefault();
  
      const status = document.getElementById('contact-status');
      status.className = 'mt-3 alert alert-success';
      status.textContent = 'Your message has been sent! (Demo)';
      // clear inputs
      form.reset();
    });
  });
  