var DataTypes = require("sequelize").DataTypes;
var _account_type = require("./account_type");
var _active_credit_invoice_costs = require("./active_credit_invoice_costs");
var _amount_on_account = require("./amount_on_account");
var _branch_office = require("./branch_office");
var _branch_office_contact = require("./branch_office_contact");
var _branch_office_product = require("./branch_office_product");
var _company = require("./company");
var _company_owner = require("./company_owner");
var _company_owner_company = require("./company_owner_company");
var _company_owner_status = require("./company_owner_status");
var _contact_type = require("./contact_type");
var _credit_invoice_detail = require("./credit_invoice_detail");
var _credit_invoice_last_pay = require("./credit_invoice_last_pay");
var _credit_invoice_pay = require("./credit_invoice_pay");
var _credit_invoice_pay_profit = require("./credit_invoice_pay_profit");
var _customer = require("./customer");
var _customer_contact = require("./customer_contact");
var _employee = require("./employee");
var _employee_status = require("./employee_status");
var _history_changes_product_cost = require("./history_changes_product_cost");
var _history_changes_product_price = require("./history_changes_product_price");
var _invoice = require("./invoice");
var _invoice_product_detail = require("./invoice_product_detail");
var _invoice_status = require("./invoice_status");
var _invoice_type = require("./invoice_type");
var _job = require("./job");
var _job_role = require("./job_role");
var _payment_advance = require("./payment_advance");
var _period_transaction = require("./period_transaction");
var _permission = require("./permission");
var _product = require("./product");
var _product_status = require("./product_status");
var _product_type = require("./product_type");
var _real_state_invoice = require("./real_state_invoice");
var _real_state_invoice_product = require("./real_state_invoice_product");
var _recurrent_transaction = require("./recurrent_transaction");
var _recurrent_transaction_transaction = require("./recurrent_transaction_transaction");
var _role = require("./role");
var _role_permission = require("./role_permission");
var _seller = require("./seller");
var _seller_client_status = require("./seller_client_status");
var _seller_contact = require("./seller_contact");
var _subcriptionplan = require("./subcriptionplan");
var _transaction = require("./transaction");
var _transaction_type = require("./transaction_type");
var _user = require("./user");

function initModels(sequelize) {
  var account_type = _account_type(sequelize, DataTypes);
  var active_credit_invoice_costs = _active_credit_invoice_costs(sequelize, DataTypes);
  var amount_on_account = _amount_on_account(sequelize, DataTypes);
  var branch_office = _branch_office(sequelize, DataTypes);
  var branch_office_contact = _branch_office_contact(sequelize, DataTypes);
  var branch_office_product = _branch_office_product(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var company_owner = _company_owner(sequelize, DataTypes);
  var company_owner_company = _company_owner_company(sequelize, DataTypes);
  var company_owner_status = _company_owner_status(sequelize, DataTypes);
  var contact_type = _contact_type(sequelize, DataTypes);
  var credit_invoice_detail = _credit_invoice_detail(sequelize, DataTypes);
  var credit_invoice_last_pay = _credit_invoice_last_pay(sequelize, DataTypes);
  var credit_invoice_pay = _credit_invoice_pay(sequelize, DataTypes);
  var credit_invoice_pay_profit = _credit_invoice_pay_profit(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var customer_contact = _customer_contact(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var employee_status = _employee_status(sequelize, DataTypes);
  var history_changes_product_cost = _history_changes_product_cost(sequelize, DataTypes);
  var history_changes_product_price = _history_changes_product_price(sequelize, DataTypes);
  var invoice = _invoice(sequelize, DataTypes);
  var invoice_product_detail = _invoice_product_detail(sequelize, DataTypes);
  var invoice_status = _invoice_status(sequelize, DataTypes);
  var invoice_type = _invoice_type(sequelize, DataTypes);
  var job = _job(sequelize, DataTypes);
  var job_role = _job_role(sequelize, DataTypes);
  var payment_advance = _payment_advance(sequelize, DataTypes);
  var period_transaction = _period_transaction(sequelize, DataTypes);
  var permission = _permission(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_status = _product_status(sequelize, DataTypes);
  var product_type = _product_type(sequelize, DataTypes);
  var real_state_invoice = _real_state_invoice(sequelize, DataTypes);
  var real_state_invoice_product = _real_state_invoice_product(sequelize, DataTypes);
  var recurrent_transaction = _recurrent_transaction(sequelize, DataTypes);
  var recurrent_transaction_transaction = _recurrent_transaction_transaction(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var role_permission = _role_permission(sequelize, DataTypes);
  var seller = _seller(sequelize, DataTypes);
  var seller_client_status = _seller_client_status(sequelize, DataTypes);
  var seller_contact = _seller_contact(sequelize, DataTypes);
  var subcriptionplan = _subcriptionplan(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var transaction_type = _transaction_type(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  amount_on_account.belongsTo(account_type, { as: "account_type", foreignKey: "account_type_id"});
  account_type.hasMany(amount_on_account, { as: "amount_on_accounts", foreignKey: "account_type_id"});
  period_transaction.belongsTo(amount_on_account, { as: "amount_on_account", foreignKey: "amount_on_account_id"});
  amount_on_account.hasMany(period_transaction, { as: "period_transactions", foreignKey: "amount_on_account_id"});
  account_type.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(account_type, { as: "account_types", foreignKey: "branch_office_id"});
  active_credit_invoice_costs.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(active_credit_invoice_costs, { as: "active_credit_invoice_costs", foreignKey: "branch_office_id"});
  branch_office_contact.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(branch_office_contact, { as: "branch_office_contacts", foreignKey: "branch_office_id"});
  branch_office_product.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(branch_office_product, { as: "branch_office_products", foreignKey: "branch_office_id"});
  customer.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(customer, { as: "customers", foreignKey: "branch_office_id"});
  employee.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(employee, { as: "employees", foreignKey: "branch_office_id"});
  invoice.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(invoice, { as: "invoices", foreignKey: "branch_office_id"});
  job.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(job, { as: "jobs", foreignKey: "branch_office_id"});
  permission.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(permission, { as: "permissions", foreignKey: "branch_office_id"});
  product_status.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(product_status, { as: "product_statuses", foreignKey: "branch_office_id"});
  product_type.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(product_type, { as: "product_types", foreignKey: "branch_office_id"});
  recurrent_transaction.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(recurrent_transaction, { as: "recurrent_transactions", foreignKey: "branch_office_id"});
  role.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(role, { as: "roles", foreignKey: "branch_office_id"});
  seller.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(seller, { as: "sellers", foreignKey: "branch_office_id"});
  transaction.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(transaction, { as: "transactions", foreignKey: "branch_office_id"});
  transaction_type.belongsTo(branch_office, { as: "branch_office", foreignKey: "branch_office_id"});
  branch_office.hasMany(transaction_type, { as: "transaction_types", foreignKey: "branch_office_id"});
  branch_office.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(branch_office, { as: "branch_offices", foreignKey: "company_id"});
  company_owner_company.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(company_owner_company, { as: "company_owner_companies", foreignKey: "company_id"});
  company_owner_company.belongsTo(company_owner, { as: "company_owner", foreignKey: "company_owner_id"});
  company_owner.hasMany(company_owner_company, { as: "company_owner_companies", foreignKey: "company_owner_id"});
  company_owner.belongsTo(company_owner_status, { as: "company_owner_status", foreignKey: "company_owner_status_id"});
  company_owner_status.hasMany(company_owner, { as: "company_owners", foreignKey: "company_owner_status_id"});
  branch_office_contact.belongsTo(contact_type, { as: "contact_type", foreignKey: "contact_type_id"});
  contact_type.hasMany(branch_office_contact, { as: "branch_office_contacts", foreignKey: "contact_type_id"});
  customer_contact.belongsTo(contact_type, { as: "contact_type", foreignKey: "contact_type_id"});
  contact_type.hasMany(customer_contact, { as: "customer_contacts", foreignKey: "contact_type_id"});
  seller_contact.belongsTo(contact_type, { as: "contact_type", foreignKey: "contact_type_id"});
  contact_type.hasMany(seller_contact, { as: "seller_contacts", foreignKey: "contact_type_id"});
  credit_invoice_pay_profit.belongsTo(credit_invoice_pay, { as: "credit_invoice_pay", foreignKey: "credit_invoice_pay_id"});
  credit_invoice_pay.hasMany(credit_invoice_pay_profit, { as: "credit_invoice_pay_profits", foreignKey: "credit_invoice_pay_id"});
  payment_advance.belongsTo(credit_invoice_pay, { as: "credit_invoice_pay", foreignKey: "credit_invoice_pay_id"});
  credit_invoice_pay.hasMany(payment_advance, { as: "payment_advances", foreignKey: "credit_invoice_pay_id"});
  customer_contact.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(customer_contact, { as: "customer_contacts", foreignKey: "customer_id"});
  invoice.belongsTo(customer, { as: "createdfor_customer", foreignKey: "createdfor_customer_id"});
  customer.hasMany(invoice, { as: "invoices", foreignKey: "createdfor_customer_id"});
  user.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  employee.hasMany(user, { as: "users", foreignKey: "employee_id"});
  employee.belongsTo(employee_status, { as: "employee_status", foreignKey: "employee_status_id"});
  employee_status.hasMany(employee, { as: "employees", foreignKey: "employee_status_id"});
  credit_invoice_detail.belongsTo(invoice, { as: "invoice", foreignKey: "invoice_id"});
  invoice.hasMany(credit_invoice_detail, { as: "credit_invoice_details", foreignKey: "invoice_id"});
  credit_invoice_last_pay.belongsTo(invoice, { as: "invoice", foreignKey: "invoice_id"});
  invoice.hasMany(credit_invoice_last_pay, { as: "credit_invoice_last_pays", foreignKey: "invoice_id"});
  credit_invoice_pay.belongsTo(invoice, { as: "invoice", foreignKey: "invoice_id"});
  invoice.hasMany(credit_invoice_pay, { as: "credit_invoice_pays", foreignKey: "invoice_id"});
  invoice_product_detail.belongsTo(invoice, { as: "invoice", foreignKey: "invoice_id"});
  invoice.hasMany(invoice_product_detail, { as: "invoice_product_details", foreignKey: "invoice_id"});
  real_state_invoice.belongsTo(invoice, { as: "invoice", foreignKey: "invoice_id"});
  invoice.hasMany(real_state_invoice, { as: "real_state_invoices", foreignKey: "invoice_id"});
  invoice.belongsTo(invoice_status, { as: "invoice_status", foreignKey: "invoice_status_id"});
  invoice_status.hasMany(invoice, { as: "invoices", foreignKey: "invoice_status_id"});
  invoice.belongsTo(invoice_type, { as: "invoice_type", foreignKey: "invoice_type_id"});
  invoice_type.hasMany(invoice, { as: "invoices", foreignKey: "invoice_type_id"});
  employee.belongsTo(job, { as: "job", foreignKey: "job_id"});
  job.hasMany(employee, { as: "employees", foreignKey: "job_id"});
  job_role.belongsTo(job, { as: "job", foreignKey: "job_id"});
  job.hasMany(job_role, { as: "job_roles", foreignKey: "job_id"});
  role_permission.belongsTo(permission, { as: "permission", foreignKey: "permission_id"});
  permission.hasMany(role_permission, { as: "role_permissions", foreignKey: "permission_id"});
  branch_office_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(branch_office_product, { as: "branch_office_products", foreignKey: "product_id"});
  history_changes_product_cost.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(history_changes_product_cost, { as: "history_changes_product_costs", foreignKey: "product_id"});
  history_changes_product_price.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(history_changes_product_price, { as: "history_changes_product_prices", foreignKey: "product_id"});
  invoice_product_detail.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(invoice_product_detail, { as: "invoice_product_details", foreignKey: "product_id"});
  real_state_invoice_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(real_state_invoice_product, { as: "real_state_invoice_products", foreignKey: "product_id"});
  product.belongsTo(product_status, { as: "product_status", foreignKey: "product_status_id"});
  product_status.hasMany(product, { as: "products", foreignKey: "product_status_id"});
  product.belongsTo(product_type, { as: "product_type", foreignKey: "product_type_id"});
  product_type.hasMany(product, { as: "products", foreignKey: "product_type_id"});
  real_state_invoice_product.belongsTo(real_state_invoice, { as: "real_state_invoice", foreignKey: "real_state_invoice_id"});
  real_state_invoice.hasMany(real_state_invoice_product, { as: "real_state_invoice_products", foreignKey: "real_state_invoice_id"});
  recurrent_transaction_transaction.belongsTo(recurrent_transaction, { as: "recurrent_transaction", foreignKey: "recurrent_transaction_id"});
  recurrent_transaction.hasMany(recurrent_transaction_transaction, { as: "recurrent_transaction_transactions", foreignKey: "recurrent_transaction_id"});
  job_role.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(job_role, { as: "job_roles", foreignKey: "role_id"});
  role_permission.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(role_permission, { as: "role_permissions", foreignKey: "role_id"});
  seller_contact.belongsTo(seller, { as: "seller", foreignKey: "seller_id"});
  seller.hasMany(seller_contact, { as: "seller_contacts", foreignKey: "seller_id"});
  customer.belongsTo(seller_client_status, { as: "seller_client_status", foreignKey: "seller_client_status_id"});
  seller_client_status.hasMany(customer, { as: "customers", foreignKey: "seller_client_status_id"});
  seller.belongsTo(seller_client_status, { as: "seller_client_status", foreignKey: "seller_client_status_id"});
  seller_client_status.hasMany(seller, { as: "sellers", foreignKey: "seller_client_status_id"});
  company_owner.belongsTo(subcriptionplan, { as: "subcriptionplan", foreignKey: "subcriptionplan_id"});
  subcriptionplan.hasMany(company_owner, { as: "company_owners", foreignKey: "subcriptionplan_id"});
  recurrent_transaction.belongsTo(transaction, { as: "transaction", foreignKey: "transaction_id"});
  transaction.hasMany(recurrent_transaction, { as: "recurrent_transactions", foreignKey: "transaction_id"});
  recurrent_transaction_transaction.belongsTo(transaction, { as: "transaction", foreignKey: "transaction_id"});
  transaction.hasMany(recurrent_transaction_transaction, { as: "recurrent_transaction_transactions", foreignKey: "transaction_id"});
  transaction.belongsTo(transaction_type, { as: "transaction_type", foreignKey: "transaction_type_id"});
  transaction_type.hasMany(transaction, { as: "transactions", foreignKey: "transaction_type_id"});
  credit_invoice_last_pay.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(credit_invoice_last_pay, { as: "credit_invoice_last_pays", foreignKey: "createdby_user_id"});
  credit_invoice_pay.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(credit_invoice_pay, { as: "credit_invoice_pays", foreignKey: "createdby_user_id"});
  history_changes_product_cost.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(history_changes_product_cost, { as: "history_changes_product_costs", foreignKey: "createdby_user_id"});
  history_changes_product_price.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(history_changes_product_price, { as: "history_changes_product_prices", foreignKey: "createdby_user_id"});
  invoice.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(invoice, { as: "invoices", foreignKey: "createdby_user_id"});
  period_transaction.belongsTo(user, { as: "closedby_user", foreignKey: "closedby_user_id"});
  user.hasMany(period_transaction, { as: "period_transactions", foreignKey: "closedby_user_id"});
  real_state_invoice.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(real_state_invoice, { as: "real_state_invoices", foreignKey: "createdby_user_id"});
  transaction.belongsTo(user, { as: "createdby_user", foreignKey: "createdby_user_id"});
  user.hasMany(transaction, { as: "transactions", foreignKey: "createdby_user_id"});
  transaction.belongsTo(user, { as: "createdfor_user", foreignKey: "createdfor_user_id"});
  user.hasMany(transaction, { as: "createdfor_user_transactions", foreignKey: "createdfor_user_id"});

  return {
    account_type,
    active_credit_invoice_costs,
    amount_on_account,
    branch_office,
    branch_office_contact,
    branch_office_product,
    company,
    company_owner,
    company_owner_company,
    company_owner_status,
    contact_type,
    credit_invoice_detail,
    credit_invoice_last_pay,
    credit_invoice_pay,
    credit_invoice_pay_profit,
    customer,
    customer_contact,
    employee,
    employee_status,
    history_changes_product_cost,
    history_changes_product_price,
    invoice,
    invoice_product_detail,
    invoice_status,
    invoice_type,
    job,
    job_role,
    payment_advance,
    period_transaction,
    permission,
    product,
    product_status,
    product_type,
    real_state_invoice,
    real_state_invoice_product,
    recurrent_transaction,
    recurrent_transaction_transaction,
    role,
    role_permission,
    seller,
    seller_client_status,
    seller_contact,
    subcriptionplan,
    transaction,
    transaction_type,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
