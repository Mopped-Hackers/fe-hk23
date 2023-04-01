const package_json = require('../package');

module.exports = {

    api_config:{
        host: ""
    },
    mapbox:{
        access_token: "pk.eyJ1IjoiYW5kcmVqdnlzbnkiLCJhIjoiY2s3cDNvbzJuMDVjMDNlcnJ2NmJramQ0biJ9.3Xs0PsiiF7U5sfibbpA_PA",
        style: "mapbox://styles/mapbox/streets-v9"
    },

    security:{
        localStorage:{
            security_jwt_refresh_ls_name:"rt",
            security_jwt_ls_name:"t_id",
            security_user_ls_name:"u_data",
        }
    },

    serviceWorker:{
      localStorage: {
          sw_updated_status:"sw_upd",
          app_installed_status:"app_instl"
      }
    },

    theme:{
        localStorage:{
            theme:"theme"
        }
    },

    version: package_json.version
};
