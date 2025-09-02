from flask import session
from app.Models.activity_log import ActivityLog
from app.extension import db

def log_activity(action, details=None):
    admin_id = session.get('admin_id')
    if not admin_id:
        return
    log = ActivityLog(admin_id=admin_id, action=action, details=details)
    db.session.add(log)
    db.session.commit()
