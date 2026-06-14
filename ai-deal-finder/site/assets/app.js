document.addEventListener('click', function(e){
  const a = e.target.closest('a[data-affiliate]');
  if(a){
    console.log('Affiliate click:', a.href);
  }
});
