<?php
	header("content-type:text/html;charset=utf-8");
	require_once "DbController.php";
	class ExperienceController extends DbController
	{
	
	
	    public function experienceAction()
	    {
	        // action body
	        session_start();
    		$_SESSION['mysqli']=new Application_Model_Experience();
    		$mysqli=$_SESSION['mysqli'];
		
			$res=$mysqli->provinceOperation();
			$limit=$mysqli->limitOperation(1);
			$count=$mysqli->countOperation();
			if(!$res||!$limit){
				echo false;
			}else{
				//初始化省份
				$this->view->res=$res;
				$this->view->limit=$limit;
				$this->view->counts=$count[0]["count(id)"];
				//初始化城市
				$res=$mysqli->cityOperation($res[0]['province']);
				$this->view->city=$res;
				//初始化工作室列表
				$res=$mysqli->dqlOperation($res[0]['city']);
				$this->view->list=$res;
				$this->render('experience');
			}
	    }
	
		//获取城市
		public function cityAction(){
			session_start();
			if(!$_SESSION['mysqli']){
				header("location: /experience/experience",true,301);
				exit();
			}
			
			$mysqli=$_SESSION['mysqli'];
			
			$val=$_POST['province'];
			$res=$mysqli->cityOperation($val);
			if(!$res){
				echo false;
			}else{
				echo json_encode($res);
			}
			exit();
		}
		//获取工作室列表
		public function listAction(){
			session_start();
			if(!$_SESSION['mysqli']){
				header("location: /experience/experience",true,301);
				exit();
			}
			
			$mysqli=$_SESSION['mysqli'];
			
			$city=$_POST['city'];
			
			$res=$mysqli->dqlOperation($city);
			if(!$res){
				echo false;
			}else{
				echo json_encode($res);
			}
			exit();
		}
	
		//分页查询
		public function limitAction(){
			session_start();
			if(!$_SESSION['mysqli']){
				header("location: /experience/experience",true,301);
				exit();
			}
			
			$mysqli=$_SESSION['mysqli'];
			
			$nowPage=$_POST['nowPage'];
			
			$res=$mysqli->limitOperation($nowPage);
			if(!$res){
				echo false;
			}else{
				echo json_encode($res);
			}
			exit();
		}
		
		//模糊搜索
		public function likeAction(){
			session_start();
			if(!$_SESSION['mysqli']){
				header("location: /experience/experience",true,301);
				exit();
			}
			
			$mysqli=$_SESSION['mysqli'];
			
			$cityName=$_POST['cityName'];
			
			$res=$mysqli->likeOperation($city);
			if(!$res){
				echo false;
			}else{
//				echo "<pre/>";
//				print_r($res);
				echo json_encode($res);
			}
			exit();
		}
	}
?>