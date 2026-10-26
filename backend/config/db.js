
/* Pinterest-inspired application browser */
.job-browser {
  display: grid;
  grid-template-columns: 245px minmax(0, 1fr);
  align-items: start;
  gap: 24px;
  margin-top: 24px;
}

.job-filters {
  position: sticky;
  top: 20px;
  padding: 20px;
  border: 1px solid #e6e9ed;
  border-radius: 12px;
  background: #fff;
}

.filter-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 16px;
  margin-bottom: 18px;
  border-bottom: 1px solid #e6e9ed;
}

.filter-heading h2 {
  margin: 0;
  font-size: 18px;
}

.clear-filters {
  padding: 0;
  border: 0;
  background: none;
  color: #e5484d;
  font-size: 13px;
}

.filter-label {
  display: block;
  margin: 18px 0 8px;
  font-size: 13px;
  font-weight: 700;
}

.job-filters input,
.job-filters select,
.status-control select {
  width: 100%;
  min-width: 0;
  padding: 10px;
  border: 1px solid #d8dee7;
  border-radius: 7px;
  background: #fff;
  font-size: 13px;
}

.filter-count {
  margin: 20px 0 0;
  color: #667085;
  font-size: 12px;
}

.job-results {
  min-width: 0;
}

.job-results-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin: 0 0 16px;
}

.results-eyebrow {
  margin: 0 0 6px;
  color: #009c50;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.job-results-heading h2 {
  margin: 0;
  font-size: 25px;
}

.results-count {
  padding-bottom: 3px;
  color: #667085;
  font-size: 14px;
}

.job-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.job-card {
  min-width: 0;
  padding: 20px;
  border: 1px solid #e2e7ed;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(20, 35, 25, 0.025);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.job-card:hover {
  border-color: #b8e3ca;
  box-shadow: 0 8px 24px rgba(20, 35, 25, 0.07);
}

.job-card-top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.company-logo {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #e5f7ed;
  color: #008a46;
  font-size: 21px;
  font-weight: 800;
}

.job-title-group {
  flex: 1;
  min-width: 0;
}

.job-title-group h3 {
  margin: 0 0 6px;
  overflow-wrap: anywhere;
  font-size: 16px;
}

.job-company {
  margin: 0;
  color: #667085;
  font-size: 13px;
}

.job-status {
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 20px;
  background: #e5f7ed;
  color: #008a46;
  font-size: 12px;
  font-weight: 650;
}

.status-interview {
  background: #e9efff;
  color: #315bd6;
}

.status-offer {
  background: #e4f7f0;
  color: #087f5b;
}

.status-rejected {
  background: #fff0f0;
  color: #c03945;
}

.job-card-details {
  padding: 15px 0;
  color: #667085;
  font-size: 13px;
}

.job-card-details p {
  margin: 6px 0;
  overflow-wrap: anywhere;
}

.detail-icon {
  margin-right: 6px;
  color: #009c50;
}

.job-notes {
  line-height: 1.6;
}

.job-card-actions {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid #edf0f3;
}

.view-job-link {
  margin-right: auto;
  padding-bottom: 9px;
  color: #008a46;
  font-size: 13px;
  font-weight: 650;
}

.status-control {
  display: grid;
  gap: 6px;
  min-width: 145px;
  color: #667085;
  font-size: 11px;
}

.delete-button {
  padding: 10px 13px;
  border: 1px solid #f0c9cc;
  border-radius: 7px;
  background: #fff;
  color: #c03945;
  font-size: 13px;
}

.delete-button:hover {
  background: #fff0f0;
}

.empty-jobs {
  padding: 48px 20px;
  border: 1px dashed #d8dee7;
  border-radius: 12px;
  background: #fff;
  text-align: center;
}

.empty-jobs-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: #e5f7ed;
  color: #009c50;
  font-size: 25px;
}

.empty-jobs h3 {
  margin: 0 0 8px;
}

.empty-jobs p {
  color: #667085;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 800px) {
  .job-browser {
    grid-template-columns: 1fr;
  }

  .job-filters {
    position: static;
  }
}

@media (max-width: 480px) {
  .job-card {
    padding: 15px;
  }

  .job-card-top {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .job-status {
    margin-left: 58px;
  }

  .job-card-actions {
    align-items: stretch;
  }

  .status-control {
    flex: 1 1 100%;
  }
}
