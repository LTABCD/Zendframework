<?php
	class DbController extends Zend_Controller_Action{
		public function init(){
			require_once 'Zend/Db.php';

			$params = array ('host'     => 'localhost',
			                 'username' => 'root',
			                 'password' => '123456',
			                 'dbname'   => 'dwbs_website'
			                 );
			
			$db = Zend_Db::factory('PDO_MYSQL', $params);

		}
	}
?>