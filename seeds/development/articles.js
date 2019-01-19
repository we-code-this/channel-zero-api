exports.seed = function(knex, Promise) {
  return knex("articles")
    .del()
    .then(function() {
      return knex("articles").insert([
        {
          id: 1,
          url: "#",
          title: "Sollicitudin Ligula Parturient",
          summary:
            "Donec sed odio dui. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
          created_at: "2019-01-19 12:00:00"
        },
        {
          id: 2,
          url: "#",
          title: "Mattis Ultricies Egestas Pharetra",
          summary:
            "Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla…",
          created_at: "2019-01-19 12:01:00"
        },
        {
          id: 3,
          url: "#",
          title: "Parturient Fermentum Bibendum, Yo!",
          summary:
            "Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam",
          created_at: "2019-01-19 12:02:00"
        },
        {
          id: 4,
          url: "#",
          title: "Sollicitudin Ligula Parturient",
          summary:
            "Vestibulum id ligula porta felis euismod semper. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros",
          created_at: "2019-01-19 12:03:00"
        },
        {
          id: 5,
          url: "#",
          title: "Mattis Ultricies Egestas Pharetra",
          summary:
            "Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue",
          created_at: "2019-01-19 12:04:00"
        },
        {
          id: 6,
          url: "#",
          title: "Parturient Fermentum Bibendum",
          summary:
            "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur",
          created_at: "2019-01-19 12:05:00"
        },
        {
          id: 7,
          url: "#",
          title: "Egestas Ornare Commodo Cursus",
          summary:
            "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum",
          created_at: "2019-01-19 12:06:00"
        },
        {
          id: 8,
          url: "#",
          title: "Ullamcorper Sit Vehicula Condimentum",
          summary:
            "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui",
          created_at: "2019-01-19 12:07:00"
        },
        {
          id: 9,
          url: "#",
          title: "Elit Cursus Nibh",
          summary:
            "Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor",
          created_at: "2019-01-19 12:08:00"
        },
        {
          id: 10,
          url: "#",
          title: "Fermentum Commodo Tortor Vehicula Mattis",
          summary:
            "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui",
          created_at: "2019-01-19 12:09:00"
        },
        {
          id: 11,
          url: "#",
          title: "Tristique Sem Sollicitudin Amet",
          summary:
            "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.",
          created_at: "2019-01-19 12:10:00"
        }
      ]);
    });
};
