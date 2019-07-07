exports.seed = function(knex, Promise) {
  return knex('vendors')
    .del()
    .then(function() {
      return knex('vendors').insert([
        { id: 1, user_id: 1, name: 'Vendor 1', icon_class: 'vendor-1-icon' },
        { id: 2, user_id: 1, name: 'Vendor 2', icon_class: 'vendor-2-icon' },
        { id: 3, user_id: 1, name: 'Vendor 3', icon_class: 'vendor-3-icon' },
        { id: 4, user_id: 1, name: 'Vendor 4', icon_class: 'vendor-4-icon' },
        { id: 5, user_id: 1, name: 'Vendor 5', icon_class: 'vendor-5-icon' },
        { id: 6, user_id: 1, name: 'Vendor 6', icon_class: 'vendor-6-icon' },
        { id: 7, user_id: 1, name: 'Vendor 7', icon_class: 'vendor-7-icon' },
        { id: 8, user_id: 1, name: 'Vendor 8', icon_class: 'vendor-8-icon' },
        { id: 9, user_id: 1, name: 'Vendor 9', icon_class: 'vendor-9-icon' },
        { id: 10, user_id: 1, name: 'Vendor 10', icon_class: 'vendor-10-icon' }
      ]);
    });
};
