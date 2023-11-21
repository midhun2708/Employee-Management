module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      Name: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      DeptName: {
        type: Sequelize.STRING
      },
      Branch: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
  };    