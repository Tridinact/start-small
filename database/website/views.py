from datetime import datetime
from flask import Blueprint, jsonify, render_template, request, flash
from flask_login import login_required, current_user
from .models import Log
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        log = request.form.get('log')
        date = request.form.get('date')
        date = datetime.strptime(date, '%Y-%m-%dT%H:%M')

        if len(log) < 1:
            flash('Log name is too short!', category='error')
        else:
            new_log = Log(title=log, user_id=current_user.id, date=date)
            db.session.add(new_log)
            db.session.commit()
            flash('Log added!', category='success')

    return render_template("home.html", user=current_user)

@views.route('/delete-log', methods=['POST'])
def delete_log():
    log = json.loads(request.data)
    logId = log['logId']
    log = Log.query.get(logId)
    if log:
        if log.user_id == current_user.id:
            db.session.delete(log)
            db.session.commit()

    return jsonify({})
